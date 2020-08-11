import MaterialTable from 'material-table';
import React, { Component } from "react";
import { getallUsers, header_apiVersion, updateUser, deleteUser, header_ContentType_JSON,addNewUser, rootHost } from '../consts/endpoints'
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import { columns } from '../consts/columns'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


class MaterialTableDemo extends React.Component {

  state = {

  }
  constructor(props) {
    super(props);
    this.state = {
      paging: {
        count: 0,
        page: {
          number: 0,
          size: 5
        },
        sort: {
          member: "Id",
          direction: 0
        },

      },
      columns: [
        {
          title: 'Id', field: 'id', editable: false, customFilterAndSearch: (term, rowData) => {

            console.log(term)
          }
        },
        { title: 'FirstName', field: 'firstName', customFilterAndSearch: (term, rowData) => { console.log(term, rowData) } },
        { title: 'LastName', field: 'lastName', customFilterAndSearch: (term, rowData) => { console.log(term, rowData) } },
        { title: 'Age', field: 'age', customFilterAndSearch: (term, rowData) => { console.log(term, rowData) } },
        { title: 'Email', field: 'email', customFilterAndSearch: (term, rowData) => { console.log(term, rowData) } },
        { title: 'Mobile', field: 'mobile', customFilterAndSearch: (term, rowData) => { console.log(term, rowData) } },
        {
          title: 'Classification', editable: false, field: 'classification', render: rowData => <Select
            name="classification"
            value={rowData.classification}
            SelectProps={{
              native: true
            }}
            onChange={(x, y) => this.changeClassification(x, rowData)}
          ><option value="1">Engineer</option>
            <option value="2">Manager</option>
            <option value="3">Executite</option>
          </Select>
        },

        {
          title: 'IsActive', field: 'isActive', type: 'bool', editable: "false", render: rowData => <Switch checked={rowData.isActive}
            onChange={(x,y)=>this.performActivationChange(rowData)}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        },
        { title: 'Created', field: 'createdDate', editable: "false" },

      ],
      filtering: {
        id: null,
        firstName: null,
        lastName: null,
        age: null,
        createdDate: null,
        isActive: "",
        email: null,
        mobile: null,
        classification: 0
      }
    }
    this.getallUsers = this.getAllUsers.bind(this)
    this.performPageChange = this.performPageChange.bind(this)
    this.performPageRowsCountChange = this.performPageRowsCountChange.bind(this)
    this.performOrderChange = this.performOrderChange.bind(this)
    this.onfilterValueChanged = this.onfilterValueChanged.bind(this)
    this.performFilter = this.performFilter.bind(this)
    this.performRowUpdate = this.performRowUpdate.bind(this)
    this.performRowDelete = this.performRowDelete.bind(this)
    this.performActivationChange= this.performActivationChange.bind(this)
    this.performNewUserAdd=this.performNewUserAdd.bind(this)
    this.addNewUser=this.addNewUser.bind(this)
    
  }
  performPageChange(e) {
    var paging = this.state.paging;
    paging.page.number = e;
    this.getallUsers(paging, this.state.filtering)
  }
  performFilter(e) {
    var paging = this.state.paging;
    paging.page.number = 0;

    this.getallUsers(paging, this.state.filtering)
  }
  performPageRowsCountChange(e) {
    var paging = this.state.paging;
    paging.page.size = e;
    this.getallUsers(paging, this.state.filtering)
  }

  performActivationChange(sender) {
    debugger
    sender.isActive=!sender.isActive
    this.performRowUpdate(sender)
  }
  changeClassification(e, sender) {
   
    sender.classification=e.target.value
    this.performRowUpdate(sender)
  }
  performNewUserAdd(user){
    this.addNewUser(user)

  }
  getAllUsers(paging, filter) {
    var headers = new Headers();
    headers.append(header_apiVersion.name, header_apiVersion.value);
    headers.append(header_ContentType_JSON.name, header_ContentType_JSON.value)
    var then = this;
    //debugger;
    var data = fetch((rootHost + getallUsers), { method: "POST", headers, body: JSON.stringify({ paging: paging, filter: filter }) })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        then.setState(state => ({
          users: JSON.parse(text).users,
          paging: JSON.parse(text).paging
        }))
      })
      .catch(function (error) {
        return error
      });
  }

  updateUser(user, paging, filter){
    var headers = new Headers();
    headers.append(header_apiVersion.name, header_apiVersion.value);
    headers.append(header_ContentType_JSON.name, header_ContentType_JSON.value)
    var then = this;
    debugger;
    var data = fetch((rootHost + updateUser), { method: "PUT", headers, body: JSON.stringify({user:user, paging: paging, filter: filter }) })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        then.setState(state => ({
          users: JSON.parse(text).users,
          paging: JSON.parse(text).paging
        }))
      })
      .catch(function (error) {
        return error
      });
  }

  addNewUser(user){
    var headers = new Headers();
    headers.append(header_apiVersion.name, header_apiVersion.value);
    headers.append(header_ContentType_JSON.name, header_ContentType_JSON.value)
    var then = this;
    debugger;
    var data = fetch((rootHost + addNewUser), { method: "POST", headers, body: JSON.stringify(user) })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        then.setState(state => ({
          users: JSON.parse(text).users,
          paging: JSON.parse(text).paging
        }))
      })
      .catch(function (error) {
        return error
      });
  }

  deleteUser(user, paging, filter){
    var headers = new Headers();
    headers.append(header_apiVersion.name, header_apiVersion.value);
    headers.append(header_ContentType_JSON.name, header_ContentType_JSON.value)
    var then = this;
    debugger;
    var data = fetch((rootHost + deleteUser), { method: "POST", headers, body: JSON.stringify({user:user, paging: paging, filter: filter }) })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        then.setState(state => ({
          users: JSON.parse(text).users,
          paging: JSON.parse(text).paging
        }))
      })
      .catch(function (error) {
        return error
      });
  }

  performOrderChange(e) {

    var columnName = ""
    switch (e) {
      case 0:
        columnName = columns.Id;
        break;
      case 1:
        columnName = columns.FirstName;
        break;
      case 2:
        columnName = columns.LastName;
        break;
      case 3:
        columnName = columns.Age;
        break;
      case 4:
        columnName = columns.Email;
        break;
      case 5:
        columnName = columns.Mobile;
        break;
      case 6:
        columnName = columns.Classification;
        break;
      case 7:
        columnName = columns.IsActive;
        break;
      case 8:
        columnName = columns.Created;
        break;
    }
    debugger;
    var paging = this.state.paging;
    paging.sort.member = columnName;
    paging.sort.direction = paging.sort.direction === 0 ? 1 : 0;

    this.getallUsers(paging, this.state.filtering)

  }

  onfilterValueChanged(e) {
    var value = e.target.value
    switch (e.target.name) {
      case 'id':
        var filter = this.state.filtering;
        filter.id = value;
        break;
      case 'firstName':
        var filter = this.state.filtering;
        filter.firstName = value;
        break;
      case 'lastName':
        var filter = this.state.filtering;
        filter.lastName = value;
        break;
      case 'age':
        var filter = this.state.filtering;
        filter.age = value;
        break;
      case 'email':
        var filter = this.state.filtering;
        filter.email = value;
        break;
      case 'mobile':
        var filter = this.state.filtering;
        filter.mobile = value;
        break;
      case 'classification':
        var filter = this.state.filtering;
        filter.classification = value;
        break;
      case 'isActive':
        var filter = this.state.filtering;
        filter.isActive = value;
        break;
      case 'createdDate':
        var filter = this.state.filtering;
        filter.createdDate = value;
        break;
    }
    this.setState(({
      filtering: filter
    }))
  }

  performRowUpdate(newValue){
    debugger;
    this.updateUser(newValue, this.state.paging, this.state.filtering)
  }

  performRowDelete(oldValue){
    debugger;
    this.deleteUser(oldValue, this.state.paging, this.state.filtering)
  }


  componentDidMount() {
    this.getAllUsers(this.state.paging, this.state.filtering);
  }
  onFilteredChangeCustom = (value, accessor) => {
    console.log(value, accessor)
  };
  render() {
    return (
      <div style={{top:"20px", position:"absolute"}}>
        <div style={{ left: "120px", top: "0px", position: "relative" }}>

          <Grid container spacing={12}>
            <Grid item xs={1}>
              <TextField type="text" placeholder="Id" name="id" onChange={this.onfilterValueChanged} style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }} />
            </Grid>
            <Grid item xs={1}>
              <TextField type="text" placeholder="Firstname" onChange={this.onfilterValueChanged} name="firstName" style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }} />
            </Grid>
            <Grid item xs={1}>
              <TextField type="text" placeholder="Lastname" onChange={this.onfilterValueChanged} name="lastName" style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }} />
            </Grid>
            <Grid item xs={1}>
              <TextField type="text" placeholder="Age" name="age" onChange={this.onfilterValueChanged} name="age" style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }} />
            </Grid>
            <Grid item xs={1}>
              <TextField type="text" placeholder="E-mail" name="email" onChange={this.onfilterValueChanged} name="email" style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }} />
            </Grid>
            <Grid item xs={1}>
              <TextField type="text" placeholder="Mobile" name="mobile" onChange={this.onfilterValueChanged} name="mobile" style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }} />
            </Grid>
            <Grid item xs={1}>
              <Select
                name="classification"
                onChange={this.onfilterValueChanged}
                value={this.state.filtering.classification}
              >
                <option value={0}>Classification</option>
                <option value="1">Engineer</option>
                <option value="2">Manager</option>
                <option value="3">Executive</option>
              </Select>
              {/* <TextField type="text" placeholder="Classification" onChange={this.onfilterValueChanged} name="classification" style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }} /> */}
            </Grid>
            <Grid item xs={1}>
              <Select
                name="isActive"
                onChange={this.onfilterValueChanged}
                value={this.state.filtering.isActive}
              >
                <option value={null}>{"All"}</option>
                <option value={true}>Active</option>
                <option value={false}>Not active</option>
              </Select>
            </Grid>
            <Grid item xs={1}>
              <TextField
              name="createdDate"
                id="date"
                //label="CreatedDate"
                type="date"
                onChange={this.onfilterValueChanged}
                value = {this.state.filtering.createdDate}
                defaultValue={(new Date()).Date}
              />
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" color="primary" value="Search" onClick={this.performFilter} style={{ width: "50%" }} color="secondary" style={{ marginRight: 5 }}>Search</Button>
            </Grid>
          </Grid>
        </div>
        <MaterialTable
          components={{

          }}
          style={{top:"20px"}}
          title="Editable Example"
          columns={this.state.columns}
          data={this.state.users}
          page={this.state.paging.page.number}
          totalCount={this.state.paging.count}
          icons={{Add: () =>  <Button variant="contained" color="primary" style={{ width: "130px", float:"right" }} color="primary">Add new</Button>}}
          options={{
            toolbar: true,
            search: false,
            sorting: true,
            rowAdd:true,
            showTitle: false,
          }}
          onChangePage={this.performPageChange}
          onChangeRowsPerPage={this.performPageRowsCountChange}
          onOrderChange={this.performOrderChange}
          onFilteredChange={(filtered, column, value) => {
            this.onFilteredChangeCustom(value, column.id || column.accessor);
          }}
          //onSearchChange ={pageChange}
          editable={{
            onRowAdd: (newData) =>
            new Promise((resolve) => {
              debugger
              setTimeout(() => {
                resolve();
                newData.classification=1;
                newData.isActive=true
                this.performNewUserAdd(newData)
              }, 2000);
            }),
            onRowUpdate: (newValue, oldValue) =>
            new Promise((resolve) => {
              debugger
              setTimeout(() => {
                resolve();
                this.performRowUpdate(newValue)
              }, 600);
            }),
            onRowDelete: (oldValue) =>
            new Promise((resolve) => {
              debugger
              setTimeout(() => {
                resolve();
                this.performRowDelete(oldValue)
              }, 600);
            }),
            //  
          }}

        />
             
      </div>
    );
  }
}


export default MaterialTableDemo