import awsIot from 'aws-iot-device-sdk';

const awsIotDevice = awsIot.device({
    host: 'agg46jy6wee7t-ats.iot.eu-west-1.amazonaws.com',
    keyPath: 'C:\Users\Admin\Desktop\certs\private.pem.key',
    certPath: 'C:\Users\Admin\Desktop\certs\certificate.pem',
    caPath: 'C:\Users\Admin\Desktop\certs\Amazon-root-CA-1.pem',
    clientId: '1bkkls9n1e5qbu4ki48',
  });

  export default awsIotDevice;