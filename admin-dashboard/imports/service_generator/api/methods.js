import request from 'request'
import jwt from 'jsonwebtoken';

Meteor.methods({
  sendService: async function(serviceName, formData) {

    let token = jwt.sign({}, Meteor.settings.private.secret, {expiresIn: 60 * 5});
    let addServiceOptions = {
      method: 'POST',
      url: `${Meteor.settings.private.host}:${Meteor.settings.private.port}${Meteor.settings.private.path}`,
      headers:
      {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      json: {
        name: serviceName, schema: formData
      }
    }

    function addServiceRequest() {
      return new Promise(function (resolve, reject) {
        request(addServiceOptions, (err, res) => {
          if (!err) {
            console.log(res.statusCode)
            if (res.statusCode === 202) {
              resolve(res.body)
            } else {
              reject(res.body)
            }
          } else {
            reject(err);
          }

        });
      })
    }

    try {
      let res = await addServiceRequest()
      return res
    } catch (e) {
      throw new Meteor.Error(e)
    }

  }
})
