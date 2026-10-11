class TamiyaRobotExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.port = null;
        this.writer = null;
        this.reader = null;
        
        // 警報フラグ
        this.isWallAlert = false;
        this.isFlipAlert = false;
    }

    getInfo() {
        return {
            id: 'tamiyarobot',
            name: 'タミヤロボット',
            color1: '#008CBA',
            color2: '#005f7f',
            blocks: [
                {
                    opcode: 'connect',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '🤖 ロボットに接続する (USB)'
                },
                {
                    opcode: 'moveForward',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '▲ 前進する ギア[GEAR]',
                    arguments: {
                        GEAR: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'gearMenu',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'moveBackward',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '▼ バックする ギア[GEAR]',
                    arguments: {
                        GEAR: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'gearMenu',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'turn',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '[DIR] に曲がる',
                    arguments: {
                        DIR: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'dirMenu',
                            defaultValue: '左'
                        }
                    }
                },
                {
                    opcode: 'stop',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '■ 停止する'
                },
                {
                    opcode: 'horn',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '🎺 クラクションを鳴らす'
                },
                // --- アラート検知ブロック（ハットブロック） ---
                {
                    opcode: 'whenWallDetected',
                    blockType: Scratch.BlockType.HAT,
                    text: '⚠️ 壁に近づいたとき'
                },
                {
                    opcode: 'whenFlipped',
                    blockType: Scratch.BlockType.HAT,
                    text: '💀 ロボットが転倒したとき'
                }
            ],
            menus: {
                gearMenu: {
                    acceptReporters: false,
                    items: ['1', '2']
                },
                dirMenu: {
                    acceptReporters: false,
                    items: ['左', '右']
                }
            }
        };
    }

    async connect() {
        try {
            this.port = await navigator.serial.requestPort();
            await this.port.open({ baudRate: 115200 });
            
            const textEncoder = new TextEncoderStream();
            textEncoder.readable.pipeTo(this.port.writable);
            this.writer = textEncoder.writable.getWriter();
            
            // バックグラウンドでシリアル受信ループ開始
            this.startReading();

            alert("ロボットに接続しました！");
        } catch (e) {
            alert("接続エラー: " + e);
        }
    }

    async startReading() {
        const textDecoder = new TextDecoderStream();
        this.port.readable.pipeTo(textDecoder.writable);
        this.reader = textDecoder.readable.getReader();

        let buffer = "";
        try {
            while (true) {
                const { value, done } = await this.reader.read();
                if (done) break;
                if (value) {
                    buffer += value;
                    if (buffer.includes("WALL")) {
                        this.isWallAlert = true;
                        buffer = "";
                        setTimeout(() => { this.isWallAlert = false; }, 1000);
                    } else if (buffer.includes("FLIP")) {
                        this.isFlipAlert = true;
                        buffer = "";
                        setTimeout(() => { this.isFlipAlert = false; }, 1000);
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    whenWallDetected() {
        if (this.isWallAlert) {
            this.isWallAlert = false; // 1回発火したらクリア
            return true;
        }
        return false;
    }

    whenFlipped() {
        if (this.isFlipAlert) {
            this.isFlipAlert = false;
            return true;
        }
        return false;
    }

    async send(cmd) {
        if (this.writer) {
            await this.writer.write(cmd + "\n");
        }
    }

    async moveForward(args) {
        await this.send(args.GEAR === '2' ? 'F2' : 'F');
    }

    async moveBackward(args) {
        await this.send(args.GEAR === '2' ? 'B2' : 'B');
    }

    async turn(args) {
        await this.send(args.DIR === '左' ? 'L' : 'R');
    }

    async stop() {
        await this.send('S');
    }

    async horn() {
        await this.send('H');
    }
}

Scratch.extensions.register(new TamiyaRobotExtension());
