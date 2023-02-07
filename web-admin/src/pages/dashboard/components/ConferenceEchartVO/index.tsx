/**
 * Created by hao.cheng on 2017/5/5.
 */
import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

const EchartVO = (props: any) => {
  const xAxisData = [];
  const data = [];
  for (let i = 0; i < 50; i++) {
    xAxisData.push(i);
    data.push(Math.ceil((Math.cos(i / 5) * (i / 5) + i / 6) * 5) + 10);
  }
  const mouthData = props.mouthData;
  console.log('props',mouthData)
  const [options, setOptions] = useState({});
  const get_30day_data = () => {
    const xDayDatas = [];
    const yCountDatas = [];
    const meetCount = mouthData;
    for (let i = 30; i >= 0; i--) {
      // 获取过去30天中的，处于当日的时间
      const thisday = new Date(new Date().setDate(new Date().getDate() - i));
      let j;
      for (j = 0; j < meetCount.length; j++) {
        //如果找到当天有会议数据，加入到y轴数据中
        const datObj: any = new Date(meetCount[j].date);
        if (datObj.toLocaleDateString() === thisday.toLocaleDateString()) {
          yCountDatas.push(meetCount[j].count);
          break;
        }
      }
      // 将没有加入到y轴数据中的天数count设置为0
      if (j === meetCount.length) {
        yCountDatas.push(0);
      }
      // 将x轴数据加入到
      xDayDatas.push(thisday.toLocaleDateString());
    }
    const option = {
      borderRadius: 50,
      title: {
        text: '开会情况月报',
        left: 'center',
        textStyle: {
          color: '#ccc',
          fontSize: 40,
          padding: '100px',
        },
      },
      backgroundColor: '#001529',
      xAxis: [
        {
          show: true,
          data: xDayDatas,
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
          },
        },
        {
          show: false,
          data: xDayDatas,
        },
      ],
      tooltip: {},
      visualMap: {
        show: false,
        min: 0,
        max: 30,
        dimension: 0,
        inRange: {
          color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
        },
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#ccc',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#08263f',
          },
        },
        axisTick: {
          show: false,
        },
        minInterval: 1,
      },
      series: [
        {
          name: 'Simulate Shadow',
          type: 'line',
          data: yCountDatas,
          z: 2,
          showSymbol: false,
          animationDelay: 0,
          animationEasing: 'linear',
          animationDuration: 1200,
          lineStyle: {
            normal: {
              color: 'transparent',
            },
          }, 
        },
        {
          name: '当日会议次数',
          type: 'bar',
          data: yCountDatas,
          xAxisIndex: 1,
          z: 3,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
            },
          },
        },
      ],
      animationEasing: 'bounceOut',
      animationEasingUpdate: 'elasticOut',
      animationDelay: function (idx: number) {
        return idx * 20;
      },
      animationDelayUpdate: function (idx: number) {
        return idx * 20;
      },
    };
    setOptions(option)
  };
  useEffect(()=>{
    get_30day_data()
  },[])
  return (
    <ReactEcharts
      option={options}
      style={{ height: '580px', width: '103.3%', margin: '-20px' }}
    >{mouthData}</ReactEcharts>
  );
};

export default EchartVO;
