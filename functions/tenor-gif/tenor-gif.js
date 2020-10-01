const axios = require('axios')
const qs = require('qs')

exports.handler = async function(event, context) {
  // apply our function to the queryStringParameters and assign it to a variable
  // const API_PARAMS = qs.stringify(event.queryStringParameters)
  // console.log('API_PARAMS', API_PARAMS)
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { TENOR_API_KEY } = process.env;
  const GIF_LIMIT = 50;
  const TAG = 'panda';
  const MEDIA_FILTER = 'minimal';

  const TENOR_ENDPOINT = `https://api.tenor.com/v1/search?tag=${TAG}&key=${TENOR_API_KEY}&limit=${GIF_LIMIT}&media_filter=${MEDIA_FILTER}`;

  console.log('Constructed URL is ...', TENOR_ENDPOINT)

  try {
    const { data } = await axios.get(TENOR_ENDPOINT)
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}
