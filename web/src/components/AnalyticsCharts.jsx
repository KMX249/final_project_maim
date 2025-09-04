import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsCharts({ insights }) {
  if (!insights) return null;
  // Prepare chart data for each insight
  const ageData = {
    labels: Object.keys(insights.ageGroups),
    datasets: [{
      label: 'Age Groups',
      data: Object.values(insights.ageGroups),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  };
  const genderData = {
    labels: Object.keys(insights.genderGroups),
    datasets: [{
      label: 'Gender',
      data: Object.values(insights.genderGroups),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  };
  const interestsData = {
    labels: Object.keys(insights.interestsCount),
    datasets: [{
      label: 'Interests',
      data: Object.values(insights.interestsCount),
      backgroundColor: 'rgba(255, 206, 86, 0.6)',
    }],
  };
  const locationData = {
    labels: Object.keys(insights.locationCount),
    datasets: [{
      label: 'Locations',
      data: Object.values(insights.locationCount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 20,
        marginBottom: 32,
        alignItems: 'start',
      }}
    >
      <div style={{background:'#fff', borderRadius:8, padding:12, boxShadow:'0 1px 4px #0001'}}>
        <h4 style={{marginBottom:8}}>Age Groups</h4>
        <Bar data={ageData} options={{responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}} height={180} />
      </div>
      <div style={{background:'#fff', borderRadius:8, padding:12, boxShadow:'0 1px 4px #0001'}}>
        <h4 style={{marginBottom:8}}>Gender</h4>
        <Bar data={genderData} options={{responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}} height={180} />
      </div>
      <div style={{background:'#fff', borderRadius:8, padding:12, boxShadow:'0 1px 4px #0001'}}>
        <h4 style={{marginBottom:8}}>Interests</h4>
        <Bar data={interestsData} options={{responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}} height={180} />
      </div>
      <div style={{background:'#fff', borderRadius:8, padding:12, boxShadow:'0 1px 4px #0001', gridColumn:'span 3'}}>
        <h4 style={{marginBottom:8}}>Locations</h4>
        <Bar data={locationData} options={{responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}} height={100} />
      </div>
    </div>
  );
}
