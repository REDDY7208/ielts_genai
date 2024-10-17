
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import Navbar from './navbar';
import Dasbot from './DashboardBOT/DasBot';
import './Dashboard.css';
import './navbar.css';
import LogoutButton from './LogoutButton';

// Initialize Highcharts 3D module
Highcharts3D(Highcharts);

const Dashboard = () => {
  const [progressData, setProgressData] = useState(null);
  const [writingDetails, setWritingDetails] = useState(null);
  const [planStatus, setPlanStatus] = useState(null);
  const [showBot, setShowBot] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = JSON.parse(localStorage.getItem('user_id'));

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!user_id) {
        alert('User not logged in.');
        return;
      }

      try {
        const response = await fetch(`http://141.136.42.65:8081/user_progress?user_id=${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, [user_id]);

  useEffect(() => {
    const fetchWritingDetails = async () => {
      if (!user_id) {
        alert('User not logged in.');
        return;
      }

      try {
        const response = await fetch(`http://141.136.42.65:8081/user_writing_details?user_id=${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWritingDetails(data);
      } catch (error) {
        console.error('Error fetching writing details:', error);
      }
    };

    fetchWritingDetails();
  }, [user_id]);

  useEffect(() => {
    const checkPlanStatus = async () => {
      if (!user_id) {
        alert('User not logged in.');
        return;
      }

      try {
        const response = await fetch(`http://141.136.42.65:8081/check_plan_status?user_id=${user_id}`);
        const data = await response.json();

        if (data.status === 'active') {
          setPlanStatus('active');
        } else if (data.status === 'expired') {
          setPlanStatus('expired');
        } else {
          setPlanStatus('no_plan');
        }
      } catch (error) {
        console.error('Error checking plan status:', error);
        alert('Error checking plan status.');
      }
    };

    checkPlanStatus();
  }, [user_id]);

  const handleSupportClick = () => {
    if (planStatus === 'active') {
      setShowBot(prevShowBot => !prevShowBot);
    } else {
      alert('You need to buy a plan to access the IELTS TUTOR BOT.');
    }
  };

  if (!progressData || !writingDetails) {
    return <div>Loading...</div>;
  }

  // 3D Animated Charts Configuration
  const barChartOptions = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      }
    },
    title: { text: 'Writing Progress' },
    xAxis: { categories: ['Writing'] },
    series: [{ name: 'Band Score', data: [progressData.writing], color: '#9966ff' }]
  };

  const listeningBarChartOptions = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      }
    },
    title: { text: 'Listening Progress' },
    xAxis: {
      categories: progressData.listening_tests ? progressData.listening_tests.map(test => `Test ${test.test_id}`) : [],
      title: { text: 'Tests' }
    },
    yAxis: {
      min: 0,
      title: { text: 'Band Score' }
    },
    series: [
      {
        name: 'Band Score',
        data: progressData.listening_tests ? progressData.listening_tests.map(test => test.band_score) : [],
        color: '#36a2eb'
      }
    ]
  };

  const writingBandChartOptions = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      }
    },
    title: { text: 'Writing Task Band Scores' },
    xAxis: { categories: writingDetails.band_scores.map(band => `Test ${band.test_id}`) },
    series: [
      { name: 'Task 1 Band Score', data: writingDetails.band_scores.map(band => band.task_1_band_score), color: '#007bff' },
      { name: 'Task 2 Band Score', data: writingDetails.band_scores.map(band => band.task_2_band_score), color: '#28a745' },
      { name: 'Average Band Score', data: writingDetails.band_scores.map(band => band.average_band_score), color: '#ffca28' }
    ]
  };

  const writingCriteriaChartOptions = {
    chart: {
      type: 'line',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      }
    },
    title: { text: 'Writing Task Criteria Scores' },
    xAxis: { categories: writingDetails.criteria_scores.map(criteria => `Test ${criteria.test_id}`) },
    series: [
      { name: 'Task Achievement', data: writingDetails.criteria_scores.map(criteria => criteria.task_achievement), color: '#ff5722' },
      { name: 'Coherence & Cohesion', data: writingDetails.criteria_scores.map(criteria => criteria.coherence_cohesion), color: '#673ab7' },
      { name: 'Lexical Resource', data: writingDetails.criteria_scores.map(criteria => criteria.lexical_resource), color: '#3f51b5' },
      { name: 'Grammatical Range & Accuracy', data: writingDetails.criteria_scores.map(criteria => criteria.grammatical_range_accuracy), color: '#4caf50' }
    ]
  };

  // Adding new options for Speaking Progress
  const speakingProgressOptions = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      }
    },
    title: { text: 'Speaking Progress' },
    xAxis: { categories: ['Speaking'] },
    series: [{ name: 'Overall Band Score', data: [progressData.speaking], color: '#ff5722' }]
  };

  // 3D tube-style pie chart for Overall Progress
  const overallProgressOptions = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
        depth: 50,  // Adding depth to give it a tube-like appearance
        viewDistance: 25
      },
      animation: {
        duration: 1500,
        easing: 'easeOutBounce'
      }
    },
    title: { text: 'Overall Progress' },
    plotOptions: {
      pie: {
        innerSize: 100,  // Creates the donut effect
        depth: 50,  // Creates the tube effect
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.percentage:.1f}%</b>'
        }
      }
    },
    series: [{
      name: 'Overall Band Score',
      data: [
        { name: 'Listening', y: progressData.listening },
        { name: 'Writing', y: progressData.writing },
        { name: 'Reading', y: progressData.reading },
        { name: 'Speaking', y: progressData.speaking }
      ],
      colorByPoint: true,
    }]
  };

  const renderWritingDetails = () => (
    <div>

      <HighchartsReact highcharts={Highcharts} options={writingBandChartOptions} />



      <HighchartsReact highcharts={Highcharts} options={writingCriteriaChartOptions} />
    </div>
  );

  return (
    <>
      <Navbar user={user} />
      <div className="black-background">
        <div className="dashboard-container">
          <aside className="sidebar dash">
            <div className="sidebar-header-dash">
              <h2 className='dash-head'>IELTSGenAI DASHBOARD</h2>
            </div>
            <ul className="sidebar-menu">
            
            
              <li><a href="/map" onClick={(e) => e.preventDefault()}>Help</a></li>
             
            
          
              <li onClick={handleSupportClick}>IELTS TUTOR BOT</li>
              <li> <a href="/learningResources">Learning Resources</a></li>
              <li><a href="/playground1">Writing play ground</a></li>
              <li><a href="/playground2">Speaking play ground</a></li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </aside>
          <div className="charts-container">
            <div className='charts-part'>
              <div className="chart-item">

                <HighchartsReact highcharts={Highcharts} options={overallProgressOptions} />
              </div>
              <div className="chart-item">
                <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
              </div>
              <div className='chart-item'>

                <HighchartsReact highcharts={Highcharts} options={writingBandChartOptions} />
              </div>
            </div>
            <div className='charts-part'>
              <div className="chart-item">
                <HighchartsReact highcharts={Highcharts} options={listeningBarChartOptions} />
              </div>

              <div className="chart-item">

                <HighchartsReact highcharts={Highcharts} options={speakingProgressOptions} />
              </div>
              <div className='chart-item'>

                <HighchartsReact highcharts={Highcharts} options={writingCriteriaChartOptions} />
              </div>
            </div>
            <div className='charts-part'>

            </div>
          </div>
        </div>
      </div>
      {showBot && <Dasbot />}
    </>
  );
};

export default Dashboard;



