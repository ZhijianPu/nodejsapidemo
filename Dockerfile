FROM node 
#创建目录
RUN mkdir -p /home/Service
#将容器的工作目录定位到/home/Service
WORKDIR /home/Service
#把本机当前目录下的所有文件拷贝到Image的/home/Service文件夹下面
COPY . /home/Service
RUN npm install
#将容器的某个端口导出给主机，用于我们访问
EXPOSE 8195
#CMD后面跟的命令是每次容器启动的时候执行的命令
CMD ["node","bin/www"]