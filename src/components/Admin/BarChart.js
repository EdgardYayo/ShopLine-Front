import Chart from "react-apexcharts";
import { useState } from "react";




export default function BarChart(){

 const [data] = useState({
    options:{
        chart:{
            id:"basic-bar"
        },
        xaxis:{
            categories: ["men clothes", "women clothes", "electronics", "jewelry"]
        },
      
    },
    series:[
        {
            name:"Categories Popularity",
            data:[3.7,3.68,3.48,3.35]
        }
    ],
    dataLabels: {
        enabled: true,
        dropShadow: {
            enabled: true,
            left: 2,
            top: 2,
            opacity: 0.5
        }
      }
 })




    return (
        <section>
            <div>
                <h1>Categories Popularity</h1>
                <Chart 
                options={data.options}
                series={data.series}
                type="bar"
                width="500"
                />
            </div>
        </section>
    )
}