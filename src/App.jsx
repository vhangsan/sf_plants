import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from "react"

function App() {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('https://data.sfgov.org/resource/vmnk-skih.json?$limit=10')
    .then(response => response.json())
    .then(json => {
      const formattedPlants = json.map(plant => {
        return {
          latin_name: plant.latin_name || " ",
          common_name: plant.common_name || " ",
          associated_wildlife: plant.associated_wildlife ? plant.associated_wildlife.replace(/;/g, ', ') : " ",
          suitable_site_conditions: plant.suitable_site_conditions ? plant.suitable_site_conditions.replace(/;/g, ', ') : " ",
          water_needs: plant.water_needs || " ",
        };
      });
      setPlants(formattedPlants);
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])
  console.log([loading, plants])
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Latin Name</th>
          <th>Actual Name</th>
          <th>Pollinators</th>
          <th>Suitable Conditions</th>
          <th>Water Needs</th>
        </tr>
      </thead>
      <tbody>
        {plants.map((plant, index) => (
          <tr key={index}>
            <td>{plant.latin_name}</td>
            <td>{plant.common_name}</td>
            <td>{plant.associated_wildlife}</td>
            <td>{plant.suitable_site_conditions}</td>
            <td>{plant.water_needs}</td>
          </tr>
          ))}
      </tbody>
    </table>
    );
}
export default App;


