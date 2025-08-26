import * as teo from "tencentcloud-sdk-nodejs-teo";

const TeoClient: any = teo.teo.v20220901.Client;


export async function updated(
    secret_uuid: string, secret_keys: string, // 鉴权信息
    domain_uuid: string, domain_name: string, // 域名信息
    public_host: string, public_port: string, // 访问地址
    header_back: string | null, // 回源域名
    origin_back: string | null, // 回源备用
    enable_ipv6: any = null, // 已启用IPV6?
    enable_ssls: any = null, // 已启用SSL3?


): Promise<Record<string, any>> {
    const clientConfig = {
        credential: {
            secretId: secret_uuid,
            secretKey: secret_keys,
        },
        region: "",
        profile: {
            httpProfile: {
                endpoint: "teo.tencentcloudapi.com",
            },
        },
    };
    const client = new TeoClient(clientConfig);
    const params = {
        "ZoneId": domain_uuid,
        "DomainName": domain_name,
        "OriginInfo": {
            "OriginType": "IP_DOMAIN",
            "Origin": public_host,
            "HostHeader": header_back,
            "BackupOrigin ": origin_back
        },
        "OriginProtocol":
            enable_ssls == undefined ? null : (
                enable_ssls ? "HTTPS" : "HTTP"),
        "HttpOriginPort": parseInt(public_port),
        "IPv6Status": enable_ipv6
    };
    return client.ModifyAccelerationDomain(params).then(
        (data: any): any => {
            // console.log(data);
            return {done: "操作成功", uuid: data, flag: true};
        },
        (err: any): any => {
            // console.error("error", err);
            return {
                done: "操作失败", uuid: err,
                text: (err as Error).message, flag: false
            };
        }
    );
}

