import React, { Component } from "react";
import Chart from "react-apexcharts";
import {useState} from 'react'
import { colors } from "@mui/material";

const now = new Date();

export default function RealTimeChart() {

    const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime());
    const [data, setData] = useState([
        [startDate, 40],
        [now, 60],
      ]);
    var state = {
        series: [{
                data: data,
                name: "Net",
                color: "#bada55"
            }
        ],
        options: {
            chart: {
                id: 'area-datetime',
                type: 'area',
                height: 350,
                zoom: {
                  autoScaleYaxis: true
                },
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                      download: true,
                      selection: true,
                      zoom: true,
                      zoomin: true,
                      zoomout: true,
                      pan: true,
                      reset: true | '<img src="/static/icons/reset.png" width="20">',
                      customIcons: []
                    },
                    export: {
                      csv: {
                        filename: "Budgeteer",
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                          return new Date(timestamp).toDateString()
                        }
                      },
                      svg: {
                        filename: "Budgeteer",
                      },
                      png: {
                        filename: "Budgeteer",
                      }
                    },
                    autoSelected: 'zoom' 
                },
            },
            grid: {
                show: true,
                borderColor: '#90A4AE',
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: false
                    }
                },   
                yaxis: {
                    lines: {
                        show: false
                    }
                },  
                row: {
                    colors: undefined,
                    opacity: 0.5
                },  
                column: {
                    colors: undefined,
                    opacity: 0.5
                },  
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },  
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'datetime',
                min: startDate,
                tickAmount: 6,
            },
            tooltip: {
                x: {
                  format: 'dd MMM yyyy'
                }
            },
            legend: {
                show: false
            }
        }
    };

    return (
        <div className="mixed-chart">
            <Chart 
                options={state.options}
                series={state.series}
                type="line"
                width="1200"
                height="800"
            />
        </div>
    )
}
