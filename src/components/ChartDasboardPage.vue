<template>
  <Line :data="chartData" :options="chartOptions" :plugins="plugins" />
</template>

<script setup>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Tooltip, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js'
  import { styles } from '@/config/styles'

  const gradientBackgroundColor = (ctx, colors) => {
    const canvas = ctx.chart.ctx;
    const gradient = canvas.createLinearGradient(0,0,0,canvas.canvas.height / 2.1);

    colors.forEach(color => {
      gradient.addColorStop(color.position, color.value);
    })

    return gradient;
  }

  ChartJS.register(Tooltip, LineElement, PointElement, CategoryScale, LinearScale, Filler)
  const chartData = {
    labels: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
    datasets: [ 
      {
        label: 'Income',
        borderColor: styles.greenColor,
        backgroundColor: (ctx) => gradientBackgroundColor(ctx, [
          { position: 0, value: styles.greenColor },
          { position: 1, value: "rgba(255, 255, 255, 0.1)" },
        ]),
        pointBackgroundColor: styles.greenColor,
        pointRadius: 6,
        data: [100, 161, 137, 200, 400, 50]
      },
      {
        label: 'Expenses',
        borderColor: styles.redColor,
        backgroundColor: (ctx) => gradientBackgroundColor(ctx, [
          { position: 0, value: styles.redColor },
          { position: 1, value: "rgba(255, 255, 255, 0.1)" },
        ]),
        pointBackgroundColor: styles.redColor,
        pointRadius: 6,
        data: [0, 160, 100, 0, 700, 0, 10, 600, 500, 10, 3, 58, 314]
      }
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        offset: true
      },
      y: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        beginAtZero: false,
      }
    },
    borderWidth: 1,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: styles.grayColor,
        titleColor: styles.blackColor,
        bodyColor: styles.blackColor,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';

            if (label) {
                label += ': ';
            }

            if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'BYN' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.25,
        borderWidth: 2,
        borderJoinStyle: "round",
        fill: true
      }
    }
  }
</script>