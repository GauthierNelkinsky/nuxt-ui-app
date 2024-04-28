import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, RadialLinearScale } from 'chart.js'
export default defineNuxtPlugin(() => {
    Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale)
})