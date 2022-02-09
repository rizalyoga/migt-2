import { useState, useEffect } from "react";
import "./barGraph.css";
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(BarElement, CategoryScale, LinearScale);

const BarGraph = () => {
  const [chart, setCharts] = useState([]);

  const baseURL = `https://api.coinranking.com/v2/coins/?limit=10`;
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiKey = process.env.REACT_APP_MY_KEY;

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${proxyURL}${baseURL}`, {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          response.json().then((json) => {
            setCharts(json.data);
            // console.log(chart);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    console.log(chart);
  }, [baseURL, proxyURL, apiKey]);

  let data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    labels: chart?.coins?.map((el) => el.name),
    datasets: [
      {
        label: `${chart?.coins?.length} Coins Available`,
        data: chart?.coins?.map((el) => el.price),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspecRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div>
      <div className="container-graph container mx-auto px-8 xl-px-0 2xl-px-0 py-8">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-12">Bar Graph</h1>
        <Bar data={data} height={100} options={options} />
      </div>
    </div>
  );
};

export default BarGraph;
