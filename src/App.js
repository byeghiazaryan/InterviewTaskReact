import logo from './logo.svg';
import './App.css';
import MaterialTableDemo from "./components/gridComponent";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import forwardRef from 'react'




class App extends React.Component {

 

  render() {
    return  <div className="App">
      <div style={{ maxWidth: "100%" }}>
        <MaterialTableDemo />
      </div>
    </div>

  }
}

export default App;
