import 'echarts/map/js/china'
import $ajax from 'axios'
import './style.css'
const Main = document.getElementById('main')
const Loading = document.getElementById('load-wrapper')
const Extra = document.getElementById('extra')
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line')
require('echarts/lib/chart/map')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/visualMap')
require('echarts/lib/component/geo')
var myChart = null
window.jump = function (name) {
   Loading.style.display = 'block'
   Extra.style.display = 'none'
   if (!name) return
   make(name)
}
function randomValue() {
   return 0
}
function getFullName(name) {
   var obj = dataList.find(val => {
      return val.name == name
   })
   return obj.nameFull
}
window.back = function(){
   Extra.style.display = 'none'
   Main.style.display = 'none'
   Loading.style.display="block"
   myChart.dispose()
   dataList2 = []
   dataTime = []
   begin()
}
var dataList = [
   { name: '南海诸岛', nameFull: '南海诸岛', value: -1 },
   { name: '北京', nameFull: '北京市', value: randomValue() },
   { name: '天津', nameFull: '天津市', value: randomValue() },
   { name: '上海', nameFull: '上海市', value: randomValue() },
   { name: '重庆', nameFull: '重庆市', value: randomValue() },
   { name: '河北', nameFull: '河北省', value: randomValue() },
   { name: '河南', nameFull: '河南省', value: randomValue() },
   { name: '云南', nameFull: '云南省', value: randomValue() },
   { name: '辽宁', nameFull: '辽宁省', value: randomValue() },
   { name: '黑龙江', nameFull: '黑龙江省', value: randomValue() },
   { name: '湖南', nameFull: '湖南省', value: randomValue() },
   { name: '安徽', nameFull: '安徽省', value: randomValue() },
   { name: '山东', nameFull: '山东省', value: 5555 },
   { name: '新疆', nameFull: '新疆维吾尔自治区', value: 99999 },
   { name: '江苏', nameFull: '江苏省', value: randomValue() },
   { name: '浙江', nameFull: '浙江省', value: randomValue() },
   { name: '江西', nameFull: '江西省', value: 555 },
   { name: '湖北', nameFull: '湖北省', value: randomValue() },
   { name: '广西', nameFull: '广西壮族自治区', value: randomValue() },
   { name: '甘肃', nameFull: '甘肃省', value: randomValue() },
   { name: '山西', nameFull: '山西省', value: randomValue() },
   { name: '内蒙古', nameFull: '内蒙古自治区', value: randomValue() },
   { name: '陕西', nameFull: '陕西省', value: randomValue() },
   { name: '吉林', nameFull: '吉林省', value: randomValue() },
   { name: '福建', nameFull: '福建省', value: randomValue() },
   { name: '贵州', nameFull: '贵州省', value: randomValue() },
   { name: '广东', nameFull: '广东省', value: randomValue() },
   { name: '青海', nameFull: '青海省', value: randomValue() },
   { name: '西藏', nameFull: '西藏自治区', value: randomValue() },
   { name: '四川', nameFull: '四川省', value: randomValue() },
   { name: '宁夏', nameFull: '宁夏回族自治区', value: randomValue() },
   { name: '海南', nameFull: '海南省', value: randomValue() },
   { name: '台湾', nameFull: '台湾省', value: randomValue() },
   { name: '香港', vnameFull: '香港', value: randomValue() },
   { name: '澳门', vnameFull: '澳门', value: randomValue() }
]

var option = {
   tooltip: {
      triggerOn: 'click',
      enterable: true,
      formatter: function (params, ticket, callback) {
         var tag = params.seriesName
         var name = params.name
         if(name=='山东') name='沙东'
         var value = params.value
         if (name == '南海诸岛') return ''
         return `<div style="display:flex">
         <div style="padding-left:2px">
            地区：${name}<br>${tag}：${value}
         </div>
         <a style="margin: 3px 0;border-left:1px solid #ccc;padding:2px;
         display:flex;justify-content:center;align-items:center;
         margin-left:9px;padding-left:9px;font-size:15px;" 
         onclick="jump('${name}');">
            详情 ></a>
         </div>
         `
      }
   },
   visualMap: {
      type: 'piecewise',
      pieces: [
         { max: 0 },
         { min: 1, max: 9 },
         { min: 10, max: 99 },
         { min: 100, max: 999 },
         { min: 1000, max: 9999 },
         { min: 10000 },
      ],
      splitNumber: 5,
      // left: 'left',
      // top: 'bottom',
      color: ['#820000', '#e33b2b', '#ef7341', '#fb9d78', '#ffb395', '#e3e3e3'],
   },
   geo: {
      map: 'china',
      zoom: 1.23,
      label: {
         normal: {
            show: true,
            fontSize: '12',
            color: 'rgba(0,0,0,0.7)'
         }
      },
      itemStyle: {
         normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)'
         },
         emphasis: {
            areaColor: '#b8c9ff',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
         }
      }
   },
   series: [
      {
         hoverAnimation: true,
         name: '确诊',
         type: 'map',
         geoIndex: 0,
         data: dataList
      }
   ]
};

var dataList2 = []
var dataTime = []
function make(query) {
   myChart.dispose()
   $ajax.get(`https://lab.isaaclin.cn/nCoV/api/area?latest=0&province=${getFullName(query)}`)
      .then(doc => {
         doc.data.results.forEach(v => {
            let t = new Date(v.updateTime)
            let time = `${t.getMonth() + 1}月${t.getDate()}日`
            if (dataTime.includes(time)) return
            dataTime.unshift(time)
            dataList2.unshift(
               v.confirmedCount,
            )
         })
         myChart = echarts.init(document.getElementById('main'))
         Loading.style.display = 'none'
         Extra.style.display = 'block'
         Extra.innerHTML = '点击这里返回'
         myChart.setOption({
            xAxis: {
               type: 'category',
               data: dataTime,
               name: '时间'
            },
            yAxis: {
               type: 'value',
               name: query + '的确诊人数'
            },
            series: [{
               data: dataList2,
               type: 'line',
               smooth: true
            }],
            tooltip: {
               //鼠标悬停提示内容
               trigger: 'axis', // 触发类型，默认数据触发，可选为：'axis' item
               axisPointer: {
                   // 坐标轴指示器，坐标轴触发有效
                   type: "line", // 默认为直线，可选为：'line' | 'shadow'
                   label:'cross',
                   show:true
               },
               //   formatter: function () {
               //    return 
               // }
               }
         });
         myChart.dispatchAction({
            type: 'showTip',
            seriesIndex:1,  // 显示第几个series
         });
      })
}
Extra.style.display = 'none'
$ajax.get('https://lab.isaaclin.cn/nCoV/api/area')
   .then(doc => {
      doc.data.results.forEach(v => {
         dataList.forEach(l => {
            if (l.name == v.provinceShortName) {
               l.value = v.confirmedCount
            }
         })
      })
      begin()
   })
function begin(){
   myChart = echarts.init(document.getElementById('main'))
   myChart.setOption(option);
   myChart.on("mouseover", function (params) {
      myChart.dispatchAction({
         type: 'downplay',
         name: '南海诸岛'
      });
   });
   Loading.style.display = 'none'
   Main.style.opacity = '1'
   Main.style.display = 'block'
   Extra.style.display = 'block'
   Extra.innerHTML = '点击省份可查看详情'
}
