import os
from src.pandora_cloud.server import app


def get_port():
    try:
        port = os.getenv("PORT", default=5000)
        return int(port)
    except ValueError:
        print("错误: 环境变量 PORT 不是有效的整数。将使用默认端口 5000。")
        return 5000


if __name__ == '__main__':
    try:
        port = get_port()
        app.run(debug=True, port=port, host='0.0.0.0')
    except Exception as e:
        print(f"启动应用时发生错误: {e}")
    
