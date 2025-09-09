# OpenPort WebHook Helper

## 项目简介

**OpenPort WebHook Helper**是一个基于Lucky项目辅助工具，用于STUN或DDNS后向云平台提交WebHook代理

例如您使用了Lucky或者其他Stun工具获取地址后，可以借助本工具实现把获取的IP端口提交到云平台上

本工具完全开源，基于Hono+TypeScript框架，您可以部署本项目到Cloudflare Worker、Edgeone等平台

**项目仓库**：https://github.com/PIKACHUIM/StunWebHooks，**演示站接口**：https://websdk.524228.xyz/



## 免责声明

- 本项目不收集、保留、使用或出售任何用户的个人信息，包括但不限于secretId/Key、ZoneID、域名、IP、端口等信息。
- 本项目不对所提供的公共接口或其他任何使用本项目自建的接口承诺为用户所提供的任何信息的泄露风险进行任何保障。
- 公共接口仅供演示所用，由于secret为敏感数据，建议所有用户自行部署使用，本项目不承担使用公共接口的一切后果。

## 一键部署

本工具已支持Cloudflare Worker、EdgeOne Functions国际站和国内站方式一键部署

部署完成后请前往[EdgeOne Functions](https://console.tencentcloud.com/edgeone/pages)或[Cloudflare Worker](https://dash.cloudflare.com/)绑定自己的域名即可使用

|                   Cloudflare Worker 全球站                   |                                                                                                                                 EdgeOsne Functions 国际站                                                                                                                                 |                   EdgeOne Functions 中国站                   |
| :----------------------------------------------------------: |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:| :----------------------------------------------------------: |
| [<img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers" style="width:400px;heigh:200px" />](https://deploy.workers.cloudflare.com/?url=https://github.com/PIKACHUIM/StunWebHooks) | [<img src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" alt="使用 EdgeOne Pages 部署" style="width:400px;heigh:200px" />](https://edgeone.ai/pages/new?project-name=StunWebHooks&repository-url=https://github.com/PIKACHUIM/StunWebHooks&build-command=npm%20run%20build-eo) | [<img src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" alt="使用 EdgeOne Pages 部署" style="width:400px;heigh:200px" />](https://console.cloud.tencent.com/edgeone/pages/new?project-name=StunWebHooks&repository-url=https://github.com/PIKACHUIM/StunWebHooks&build-command=npm%20run%20build-eo) |


## 主动穿透

适用于有NAT1的无公网IP环境，且使用网页的应用协议

- ### 设置Lucky STUN穿透IP

  - 安装Lucky：[gdy666/lucky](https://github.com/gdy666/lucky)

  - 打开http://<运行设备IP>:16601

    （默认账号: 666 默认密码: 666）

  - 添加一个STUN端口转发，填写IP和端口信息

  - 转发无误之后可以使用IP端口打开你的应用

- ### Edgeone CDN 自动回源

  - #### Lucky Webhook 地址

    ```
    /api/eo/zones/update
    ```

  - #### Lucky Webhook 内容

    ```json
    {
        "secret_uuid": "腾讯云secretId",
        "secret_keys": "腾讯云secretKey",
        "domain_uuid": "zone-*******(EO区域ID)",
        "domain_name": "需要修改的域名",
        "public_host": "{ip}",
        "public_port": "{port}",
    }
    ```

## 被动穿透

需要客户端维持的穿透，类似于FRP，分为两种情况：

1、只使用Web协议，此时只需要映射端使用客户端来穿透
2、使用其他TCP协议的，需要映射端和访问端使用客户端




## 手动部署

### 拉取仓库

```shell
https://github.com/PIKACHUIM/StunWebHooks.git
```

### 测试项目
```shell
npm install
npm run dev
```
### 部署项目

```shell
npm run deploy
```

