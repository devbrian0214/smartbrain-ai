import { responses } from '../Common/responseAPI.js';
import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc';
import * as dotenv from 'dotenv';

dotenv.config();

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key ' + process.env.CLA_PAT);

export const handleImageURL = (req, res) => {
  try {
    const { imageURL } = req.body;

    // check inputs
    if (!imageURL) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    stub.PostModelOutputs(
      {
        user_app_id: {
          user_id: process.env.CLA_USER_ID,
          app_id: process.env.CLA_APP_ID,
        },
        model_id: process.env.CLA_MODEL_ID,
        inputs: [
          { data: { image: { url: imageURL, allow_duplicate_url: true } } },
        ],
      },
      metadata,
      (err, response) => {
        if (err) {
          throw new Error(err);
        }

        if (response.status.code !== 10000) {
          throw new Error(
            'Post model outputs failed, status: ' + response.status.description
          );
        }

        // Since we have one input, one output will exist here.
        const output = response.outputs[0].data.regions;

        // extract region_info into array of regions
        const regionArr = [];

        for (let region of output) {
          regionArr.push(region['region_info']['bounding_box']);
        }

        if (!regionArr.length) {
          responses._404(res, { message: 'Failed' });
          return;
        }

        // send response
        responses._200(res, { regionArr, message: 'Sucessful' });
      }
    );
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};
