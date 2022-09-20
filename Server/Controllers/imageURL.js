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
    const { imageUrl } = req.body;

    // check inputs
    if (!imageUrl) {
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
          { data: { image: { url: imageUrl, allow_duplicate_url: true } } },
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
        const regionArr = output.map(
          region => region['region_info']['bounding_box']
        );

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
