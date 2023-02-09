import { useState } from "react";
import Chart from "react-apexcharts";

export default function BarChart() {
  const [data] = useState({
    options: {
      labels: ["electronics", "jewelery", "men's clothing", "women's clothing"],
      colors: ["#4318FF", "#6AD2FF", "#97FF6A", "#5e17eb"],
      chart: {
        width: "50px",
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
      },
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: true,
      },
      hover: { mode: null },
      plotOptions: {
        donut: {
          expandOnClick: false,
          donut: {
            labels: {
              show: false,
            },
          },
        },
      },
      fill: {
        colors: ["#4318FF", "#6AD2FF", "#97FF6A","#5e17eb"],
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
    },
    series: [297, 242.5, 327.25, 279.16],
  });

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
  );
}
