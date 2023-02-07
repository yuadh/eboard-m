package com.yuadh.ebm;

import com.yuadh.ebm.mqtt.MyMqttClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyCommandRunner implements CommandLineRunner {
    /**
     * 启动mqtt客户端,接收订阅的消息
     * @param args
     */
    @Override
    public void run(String... args) {
        MyMqttClient mqttClient=new MyMqttClient();
        mqttClient.start();
    }
}
