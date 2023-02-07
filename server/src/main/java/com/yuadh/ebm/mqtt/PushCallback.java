package com.yuadh.ebm.mqtt;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yuadh.ebm.mapper.EquipmentMapper;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.stereotype.Component;

public class PushCallback implements MqttCallback {
    public static final String HOST = "tcp://127.0.0.1";
    private MqttConnectOptions options;
    private static String clientid = "";
    private org.eclipse.paho.client.mqttv3.MqttClient client;
    
    @Override
    public void connectionLost(Throwable cause) {
        System.out.println("connectionLost---------连接断开，可以做重连");
    }
    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete---------" + token.isComplete());
    }
    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        System.out.println("接收消息主题 : " + topic);
        System.out.println("接收消息Qos : " + message.getQos());
        String res = new String(message.getPayload());
        System.out.println("接收消息内容 : " + res);
        clientid=System.currentTimeMillis()+"zs";
        client = new MqttClient(HOST, clientid, new MemoryPersistence());
        client.connect(options);

        //通过上下文的方式获取Service，然后在这个地方保存数据即可
        if(topic.equals("yuadh/IP")){
            ApplicationContext context = SpringUtil.context;  //获取Spring容器
            EquipmentMapper equipmentMapper= context.getBean(EquipmentMapper.class);
            JSONObject receive= JSON.parseObject(new String(message.getPayload()));
            equipmentMapper.setIp((String)receive.get("ip"),(String)receive.get("eid"));
        }
    }
    @Component
    public static class SpringUtil extends ApplicationObjectSupport {
        public static ApplicationContext context;

        public static Object getBean(String serviceName){
            return context.getBean(serviceName);
        }

        @Override
        protected void initApplicationContext(ApplicationContext context) throws BeansException {
            super.initApplicationContext(context);
            SpringUtil.context = context;
        }
    }
}
