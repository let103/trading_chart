import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { Table, Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import { head, isEqual } from 'lodash';
import ItemContainer from '../Item/ItemContainer';
import LineChart from '../../../../components/LineChart/LineChart';
import './Porfolios.css';
import loadingIcon from '../../../../img/loading.gif';

class Portfolios extends Component {
    static defaultProps = {
        currentUrl: '',
    };

    constructor(props){
        super(props);
        this.state = {
            show: false,
            portfolios: [],
            portFoliosId: 0,
            portfolios90Days: {
                created_at: [],
                sum_market_cap: []
            },
            top30CoinList: [],
            UTCTime: {
                showUTCTime: false,
                currentHour: 0
            },
            portfoliosName: ''
        };
        this.myRef = React.createRef();
    }

    componentDidMount(){
        this.setState({
            loading: true
        });
    }

    componentWillReceiveProps(nextProps){
        const { loading } = this.state;
        if(loading){
            this.setState({
                loading: false
            });
        }

        if(nextProps.portfolios.length > 0){
            if(this.state.portFoliosId === 0){
                const defaultPorfolios = head(nextProps.portfolios);
                this.setState({
                    portFoliosId: defaultPorfolios.id,
                    portfoliosName: defaultPorfolios.name
                }, () => {
                    let payload = {
                        id: this.state.portFoliosId,
                        invest_number: ''
                    };

                    this.props.fetchHistoryPortfolios90Days(payload);
                });
            }

            this.setState({
                portfolios: nextProps.portfolios
            });
        }
        
        if( !isEmpty(nextProps.portfolios90Days) && 
            !isEqual(nextProps.portfolios90Days.created_at, this.props.portfolios90Days.created_at) &&
            !isEqual(nextProps.portfolios90Days.sum_market_cap, this.props.portfolios90Days.sum_market_cap )
        ){
            this.setState({
                portfolios90Days: nextProps.portfolios90Days
            });
        }
    }

    goToAddCrypto = (id) => {
        const { currentUrl } = this.props;
        window.location.href = `${currentUrl}/portfolio/${id}`;
    }

    getPortFoliosId = (portfoliosId, portfoliosName) => {
        this.setState({
            portFoliosId: portfoliosId,
            portfoliosName
        }, () => {
            let payload = {
                id: this.state.portFoliosId,
                invest_number: ''
            };
            this.props.fetchHistoryPortfolios90Days(payload);
        });
        this.scrollToCoinList();
        
    }

    handleClose = () => {
        this.setState({ show: false });
    }
    
    handleShow = () => {
        this.setState({ show: true });
    }

    savePorfolio = () => {
        const porfolioName = this.porfolioName.value;

        if(!porfolioName || porfolioName == ''){
            alert(' Please enter a portfolio name before saving!');
            return;
        }

        const { currentUrl } = this.props;
        const userId = currentUrl.split('/')[2];

        const body = {
                portfolio: {
                    name: porfolioName.trim(),
                    user_id: userId,
                }
        };

        this.props.addNewPortfolio(body);

        this.setState({ show: false });
    }

    renderPopUpModal = () => {
        return (
            <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title> Add portfolio </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Portfolio Name
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Enter a portfolio name" inputRef={ref => { this.porfolioName = ref; }} />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}> Close </Button>
                    <Button bsStyle="primary" onClick={this.savePorfolio}> Save </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    sortDataDesc = (data, field) => {
            this.setState({
                data: data.sort( (a,b) => (b[field] > a[field]) ? 1 : ( (b[field] < a[field]) ? -1 : 0 )   )
            })
    }

    sortDataAsc = (data, field) => {
            this.setState({
                data: data.sort( (a,b) => (b[field] < a[field]) ? 1 : ( (b[field] > a[field]) ? -1 : 0 )   )
            })
    }

    numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    scrollToCoinList = () => { 
        window.scrollTo({
            top:this.myRef.current.offsetTop, 
            behavior: "smooth" 
        })
    }

    // calculateInvestmentAndQuantity = () => {
    //     const investmentInput = document.getElementById('investment').value;
    //     if(isNaN(investmentInput)){
    //         alert('Please enter a valid investment value');
    //         return;
    //     }  
   
    //     const payload = {
    //         id: this.state.portFoliosId,
    //         invest_number: investmentInput
    //     };

    //     this.props.fetchHistoryPortfolios90Days(payload);
    // }

    drawUTCTime = () => {
        let timeZoneArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        
        return timeZoneArray.map( (i) => {
            if(i < 10){
                return (<React.Fragment>  <span onMouseOver={ () => this.showUTCTimeDetail(i)  } onMouseLeave={ () => this.hideUTCTimeDetail() }> 0{i} </span> | </React.Fragment>);
            }else{
                if(i === 23){
                    return (<span onMouseOver={ () => this.showUTCTimeDetail(i) } onMouseLeave={ () => this.hideUTCTimeDetail() }> {i} </span>);
                }else{
                   return (<React.Fragment>  <span onMouseOver={ () => this.showUTCTimeDetail(i) } onMouseLeave={ () => this.hideUTCTimeDetail() }> {i} </span> | </React.Fragment>);
                }
            }
        });
    }

    handleUTCTime = (hour,offset) => {
        let date = new Date();

        let localeUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, date.getMinutes()));

        let utc = localeUTC.getTime() + (localeUTC.getTimezoneOffset() * 60000);
    
        let nd = new Date(utc + (3600000*offset));
     
        return nd;
    }

    hideUTCTimeDetail = () => {
        this.setState({
            UTCTime: {
                showUTCTime: false
            }
        });
    }

    showUTCTimeDetail = (hour) => {
        this.setState({
            UTCTime : {
                showUTCTime: true,
                hour
            }
        });
    }

    renderUTCTemplate = () => {
        const { UTCTime: { hour } } = this.state;
        const newYorkLocale = this.handleUTCTime(hour, '-12');
        const dubaiLocale = this.handleUTCTime(hour, '-3');
        const tokyoLocale = this.handleUTCTime(hour, '+2');

        return(
            <div className="utc-time-detail">
                <p> { newYorkLocale.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) } = New York </p>
                <p> { dubaiLocale.toLocaleTimeString([],  {hour: '2-digit', minute:'2-digit'}) } = Dubai </p>
                <p> { tokyoLocale .toLocaleTimeString([],  {hour: '2-digit', minute:'2-digit'})} = Tokyo </p>
            </div>
        );
    }

    render() {
        const { portfolios, portFoliosId, loading , portfolios90Days, UTCTime: { showUTCTime}, portfoliosName } = this.state;
        let i = 0;
        
        return (
            <React.Fragment>  
                <div className="row">
                    <div className="col-md-4 site-branding">
                        <h2 className="title"> TaiFu™ Indexes </h2>
                        <p classname="small-title"> A Market/ Portfolio Tracking &amp; Management System </p>
                    </div>     
                    <div className="col-sm-8 col-md-8 col-lg-8">
                        <div className="utc-time-section">
                            UTC | 
                            {
                                this.drawUTCTime()
                            }
                            {
                                showUTCTime ? this.renderUTCTemplate() : ''
                            }
                        </div>    
                    </div> 
                </div>      
                <div className="row portfolios-section">
                    <div className="col-sm-3 col-md-3 col-lg-3 portfolios-section-left">
                        {/* <Button bsStyle="primary" onClick={this.handleShow}> Create New Index/Portfolio </Button> */}
                        <div className="portfolios-list-table-section">       
                            <Table striped condensed hover bsClass="table">
                                <thead>
                                    <tr>
                                        <th style={{ color: "#999"}}> Rank </th>
                                        <th> 
                                            INDEXES 
                                            <span className="sort-section">
                                                <i className="fa fa-caret-up sort-icon sort-icon-left" onClick={ () => this.sortDataAsc(portfolios, 'name')}></i> 
                                                <i className="fa fa-caret-down sort-icon sort-icon-right" onClick={ () => this.sortDataDesc(portfolios, 'name')}></i> 
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                            {  
                                !loading ? ( portfolios.length > 0 ?
                                portfolios.map((value) => {
                                    return (
                                        <tr onClick={ () => this.getPortFoliosId(value.id, value.name)}>
                                            <td>
                                                { i = i + 1 }
                                            </td>
                                            <td> { value.name }</td>
                                        </tr>
                                    )
                                })
                                : 
                                    <tr>
                                        <td colspan="6" className="text-center">
                                            No available data
                                        </td>
                                    </tr>
                                ) :   <tr >
                                            <td colspan="6" className="text-center">
                                                <img src={loadingIcon} width="80px" />
                                            </td>
                                      </tr>
                            }
                        </tbody>
                            </Table>
                        </div>       
                    </div>
                    { portfolios90Days.created_at.length > 0 && 
                        <div className="col-sm-9 col-md-9 col-lg-9 portfolios-section-right">
                            <LineChart portfolios90Days={portfolios90Days} />
                        </div>        
                    }    
                </div>      
                <h2 className="text-center"> Coin List ( { portfoliosName } ) </h2>
                <div ref={this.myRef}>
                    {
                        portFoliosId !== 0 && 
                        <ItemContainer 
                            fetchHistoryPortfolios90Days={this.props.fetchHistoryPortfolios90Days}
                            portFoliosId={portFoliosId} 
                        />
                    }
                </div>     
                { this.renderPopUpModal() }
            </React.Fragment>
        );
    }
}

Portfolios.propTypes = {

};

export default Portfolios;
