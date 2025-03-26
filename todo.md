# record

## 打包

```
vsce package
```

会生成 vsix 文件

本地安装，可以直接使用这个 vsix 文件

## 扩展

### 1. 在 response 后使用 > {%%} 作为后续处理

有三个参数，client,response,logger

client: client.golbal 是用例存储 env 变量的，类似 idea 中的 restclient

response: 当前请求响应的内容，可以使用 JSON.parse(response.body) 获取内容

logger: 打印日志用，在 vscode 中，可以显示出内容，使用 logger.info(),logger.error()

{{$processEnv abc}} 获取 env 里的变量

```

### test
POST https://restapi.amap.com/v3/weather/weatherInfo

key=7401ba70e533e1ad5933c517c920a6c1&city=110000&extensions=all&abc={{$processEnv abc}}

> {%
console.log("222 test...");
// process.env["abc"]="123123";
client.global.set("abc",JSON.parse(response.body).forecasts[0].city);
# console.log(response.statusCode)

logger.info(typeof(response.body))

%}

```

## todo

1. include other rest files
2. response panels by rest filename & request name
