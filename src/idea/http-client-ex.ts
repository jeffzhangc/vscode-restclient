

export interface Variables {
    set(key: string, value: any): void;
    get(key: string): any;
}

export class HttpClientEx {
    private _global: { [key: string]: any; } = {};
    private sysEnvKeys: string[] = []

    constructor() {
        this.sysEnvKeys = Object.keys(process.env)
    }

    // 实现Variables接口
    public global: Variables = {
        set: (key: string, value: any) => {
            if (key in this.sysEnvKeys) {
                this.log(`global params is forbidden, as it is system env key [${key}]`)
                return
            }

            process.env[key] = value
            this._global[key] = value;
        },
        get: (key: string) => {
            return this._global[key];
        }
    };

    // 日志函数
    public log(...args: any[]): void {
        args.forEach((arg) => {
            console.log(typeof arg === 'string' ? arg : JSON.stringify(arg));
        });
        console.log(); // 终止当前行
    }

    // 测试函数
    public test(testName: string, func: Function): void {
        console.log(`Running test: ${testName}`);
        try {
            func();
            console.log(`Test ${testName} passed.`);
        } catch (error) {
            console.error(`Test ${testName} failed: ${error}`);
        }
    }

    // 断言函数
    public assert(condition: boolean, message?: string): void {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    // 退出函数
    public exit(): void {
        console.log('Exiting the script.');
        // 这里可以添加实际的退出逻辑，比如结束进程或者返回控制权给调用者
    }
}


