import React from "react"
import { useState } from "react"
import Chart from "react-apexcharts";




export default function BarChart(){

    const [data, setData] = useState({
       options:{
        chart:{
            id:"basic-bar"
        },
        xaxis:{
        categories: ["men clothes", "women clothes", "electronics", "jewelry"]
    },},
       series:[45, 145, 240, 200],
      
    })
   
   
   
   
       return (
           <section>
               <div>
                <h1>Most Selled Products By Category</h1>
                 <Chart 
                options={data.options}
                series={data.series}
                type="pie"
                width="500"
                />
               </div>
           </section>
       )
   }