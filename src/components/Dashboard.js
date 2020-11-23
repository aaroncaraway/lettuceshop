import React from 'react';
import ListItems from './ListItems';
import SelectedItems from './SelectedItems';
import { RecipeProvider } from '../context/RecipeContext';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <RecipeProvider>
        <SelectedItems />
        <ListItems />
      </RecipeProvider>
    </div>
  );
};

export default Dashboard;
