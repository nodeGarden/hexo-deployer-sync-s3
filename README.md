
# S3 deployer plugin for [Hexo](http://zespia.tw/hexo/)

This plugin can deploy your blog via S3.

## Usage

### Install

```
npm install hexo-deployer-sync-s3 --save
```

### Enable

Add `hexo-deployer-sync-s3` to `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-deployer-sync-s3
```

### Configure

Add `bucket`, `aws_key` and `aws_secret` to `deploy`, and `full_path` to the `#Directory` section, in `_config.yml`.

``` yaml
deploy:
  type: s3
  bucket: <S3 bucket>
  aws_key: <AWS id key>  // Optional, if the environment variable `AWS_KEY` is set
  aws_secret: <AWS secret key>  // Optional, if the environment variable `AWS_SECRET` is set
  concurrency: <number of connections> // Optional
  region: <region>  // Optional, see https://github.com/LearnBoost/knox#region

#also set in your #Directory section:
  full_path: <full local path>

```

### Disable

Remove `hexo-deployer-sync-s3` from `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-deployer-sync-s3
```

### Update

Execute the following command.

```
npm update
```

### Uninstall

Execute the following command. Don't forget to disable the plugin before uninstalling.

```
npm uninstall hexo-deployer-sync-s3
```


## Contributors

- Josh Strange ([joshstrange](https://github.com/joshstrange); original implementation)

## License

MIT
