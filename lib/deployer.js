// var readdirp = require('readdirp');
// var level = require('level');
var s3 = require('s3');


module.exports = function(args) {
  var publicDir = this.config.full_path + "/" + this.config.public_dir;
  var log = this.log;

  if (!args.hasOwnProperty('concurrency')) {
    args.concurrency = 8;
  }

  if (!args.hasOwnProperty('aws_key')) {
    args.aws_key = process.env.AWS_KEY
  }

  if (!args.hasOwnProperty('aws_secret')) {
    args.aws_secret = process.env.AWS_SECRET;
  }

  if (!args.bucket || !args.aws_key || !args.aws_secret) {
    var help = '';

    help += 'You should configure deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: s3\n';
    help += '    bucket: <bucket>\n';
    help += '    [aws_key]: <aws_key>        # Optional, if provided as environment variable\n';
    help += '    [aws_secret]: <aws_secret>  # Optional, if provided as environment variable\n';
    help += '    [concurrency]: <concurrency>\n';
    help += '    [region]: <region>          # See https://github.com/LearnBoost/knox#region\n\n',
    help += 'For more help, you can check the docs: ' + 'https://github.com/nodegarden/hexo-deployer-sync-s3';

    console.log(help);
    return;
  }


  var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
      accessKeyId: args.aws_key,
      secretAccessKey: args.aws_secret,
      // any other options are passed to new AWS.S3()
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
  });

  var params = {
    localDir: publicDir,
    deleteRemoved: true, // default false, whether to remove s3 objects
                         // that have no corresponding local file.

    s3Params: {
      Bucket: args.bucket,
      Prefix: "",
      ACL: "public-read",
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
  };

  var uploader = client.uploadDir(params)
      .on('error', function(err) {
        console.error("unable to sync:", err.stack);
      })
      .on('progress', function() {
        //console.log("progress", uploader.progressAmount, uploader.progressTotal);
      })
      .on('fileUploadEnd', function(localFilePath, s3Key) {
        log.info("Uploaded: " + (""+s3Key));
      })
      .on('end', function() {
        console.log("done uploading");
      });
  return uploader;
};
