package com.yuadh.ebm.mqtt;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class MyMqttClient {
    public static final String HOST = "tcp://127.0.0.1";
    public static final String TOPIC1 = "yuadh/#";
    private static String clientid = "";
    private MqttClient client;
    private MqttConnectOptions options;
    private String userName = ""; // 非必须
    private String passWord = ""; // 非必须

    // 开始连接
    public void start() {
        try {
            clientid=System.currentTimeMillis()+"zs";
            // host为主机名，clientid即连接MQTT的客户端ID，一般以唯一标识符表示，MemoryPersistence设置clientid的保存形式，默认为以内存保存
            client = new MqttClient(HOST, clientid, new MemoryPersistence());
            // MQTT的连接设置
            options = new MqttConnectOptions();
            // 设置是否清空session,这里如果设置为f表alse表示服务器会保留客户端的连接记录，设置为true示每次连接到服务器都以新的身份连接
            options.setCleanSession(false);
            // 设置连接的用户名
            //  options.setUserName(userName);
            // 设置连接的密码
            //   options.setPassword(passWord.toCharArray());
            // 设置超时时间 单位为秒
            options.setConnectionTimeout(10);
            // 设置会话心跳时间 单位为秒 服务器会每隔1.5*20秒的时间向客户端发送个消息判断客户端是否在线，但这个方法并没有重连的机制
            options.setKeepAliveInterval(20);
            // 设置断开后重新连接
            options.setAutomaticReconnect(true);
            // 设置回调
            client.setCallback(new PushCallback());
            //MqttTopic topic = client.getTopic(TOPIC1);
            // setWill方法，如果项目中需要知道客户端是否掉线可以调用该方法。设置最终端口的通知消息 遗嘱
            //options.setWill(topic, "close".getBytes(), 1, true);
            client.connect(options);
            // 订阅消息
            sub(TOPIC1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 关闭MQTT连接
     */
    public void close() throws MqttException {
        client.close();
        client.disconnect();
    }

    /**
     * 向某个主题发布消息 默认qos：1
     *
     * @param topic:发布的主题
     * @param msg：发布的消息
     */
    public  void pub(String topic, String msg) throws MqttException {
        MqttMessage mqttMessage = new MqttMessage();
        //mqttMessage.setQos(2);
        mqttMessage.setPayload(msg.getBytes());
        MqttTopic mqttTopic = client.getTopic(topic);
        MqttDeliveryToken token = mqttTopic.publish(mqttMessage);
        token.waitForCompletion();
    }

    /**
     * 向某个主题发布消息,携带qos
     *
     * @param topic: 发布的主题
     * @param msg:   发布的消息
     * @param qos:   消息质量    Qos：0、1、2
     */
    public void pub(String topic, String msg, int qos) throws MqttException {
        MqttMessage mqttMessage = new MqttMessage();
        mqttMessage.setQos(qos);
        mqttMessage.setPayload(msg.getBytes());
        MqttTopic mqttTopic = client.getTopic(topic);
        MqttDeliveryToken token = mqttTopic.publish(mqttMessage);
        token.waitForCompletion();
    }

    /**
     * 订阅某一个主题 ，此方法默认的的Qos等级为：1
     * 至少接收一次消息
     * @param topic 主题
     */
    public void sub(String topic) throws MqttException {
        client.subscribe(topic);
    }

    /**
     * 订阅某一个主题，可携带Qos
     *
     * @param topic 所要订阅的主题
     * @param qos   消息质量：0、1、2
     */
    public void sub(String topic, int qos) throws MqttException {
        client.subscribe(topic, qos);
    }
}
