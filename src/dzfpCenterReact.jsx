class TitleContent extends  React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            dataJson:[
                {value:1,name:"税盘开1票管理",active:true},
                {value:2,name:"纸质发票打印",active:false},
                {value:3,name:"开票失败处理",active:false},
            ],
        }
    }
    handleClick(e){
        let value = $(e.target).attr("value");
        let dataJson = this.state.dataJson;
        for(let i=0;i<dataJson.length;i++){
            dataJson[i].active=false;
            if(dataJson[i].value==value){
                dataJson[i].active=true;
            }
        }
        this.setState({
            dataJson:dataJson,
        })
        this.props.handleTitleClick(value);
    }

    render(){
        return(
            <div className="finance_main_nav">
                {this.state.dataJson.map((obj) =>
                    <div className={`headTitle ${obj.active?"red":""}`} style={{paddingRight: "15px",cursor: "pointer"}} key={obj.value} value={obj.value} onClick={this.handleClick}>{obj.name}</div>
                )}
            </div>
        )
    }
}

class DropDownDox extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.handleSpanClick = this.handleSpanClick.bind(this);
        this.clearQueryData = this.clearQueryData.bind(this);
        this.closeDiv = this.closeDiv.bind(this);
        this.deleteComponent = this.deleteComponent.bind(this);
        this.state = {
            dataJson:this.props.dataJson,
            dataJsonAll:false,
            dataJsonName:this.props.dataJsonName,
            dataJsonValue:"",
            dataJsonShow:false,

        }
    }
    deleteComponent(){
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }

    componentDidMount() {
        var id=new Date().getTime() + Math.random()
        eventHub.on('clearQuery',id, this.clearQueryData);
        eventHub.on('componentWillUnmount',id, this.deleteComponent);
        this.setState({
            id:id,
        })
    }

    clearQueryData(value){
        let dataJson = null;
        switch (value) {
            case "1":
                switch (this.props.name) {
                    case "invoiceLine":
                        dataJson=[
                            {value:"",name:"全部",active:false},
                            {value:"1",name:"收据",active:false},
                            {value:"2",name:"普票-纸质发票",active:false},
                            {value:"3",name:"专票-纸质发票",active:false},
                            {value:"4",name:"普票-电子发票",active:false},
                            {value:"5",name:"专票-电子发票",active:false}
                        ];
                        break;
                    case "resultState":
                        dataJson=[
                            {value:"",name:"全部",active:false},
                            {value:"0",name:"正在处理",active:false},
                            {value:"1",name:"处理成功",active:false},
                            {value:"2",name:"已重新申请",active:false},
                            {value:"3",name:"已手动完成",active:false},
                            {value:"4",name:"需要重试",active:false},
                            {value:"5",name:"业务报错",active:false},
                            {value:"-1",name:"处理失败",active:false}
                        ]
                        break;
                    default:
                        dataJson = this.state.dataJson;
                        break;
                }
                break;
            case "2":
                switch (this.props.name) {
                    case "invoiceLine":
                        dataJson=[
                            {value:"",name:"全部",active:false},
                            {value:"2",name:"普票-纸质发票",active:false},
                            {value:"3",name:"专票-纸质发票",active:false},
                        ];
                        break;
                    case "resultState":
                        dataJson=[
                            {value:"",name:"全部",active:false},
                            {value:"1",name:"处理成功",active:false},
                        ]
                        break;
                    default:
                        dataJson = this.state.dataJson;
                        break;
                }
                break;
            case "3":
                switch (this.props.name) {
                    case "invoiceLine":
                        dataJson=[
                            {value:"",name:"全部",active:false},
                            {value:"1",name:"收据",active:false},
                            {value:"2",name:"普票-纸质发票",active:false},
                            {value:"3",name:"专票-纸质发票",active:false},
                            {value:"4",name:"普票-电子发票",active:false},
                            {value:"5",name:"专票-电子发票",active:false}
                        ];
                        break;
                    case "resultState":
                        dataJson=[
                            {value:"",name:"全部",active:false},
                            {value:"2",name:"已重新申请",active:false},
                            {value:"4",name:"需要重试",active:false},
                            {value:"5",name:"业务报错",active:false},
                            {value:"-1",name:"处理失败",active:false}
                        ]
                        break;
                    default:
                        dataJson = this.state.dataJson;
                        break;
                }
                break;
            default:
                dataJson = this.state.dataJson;
                break;
        }
        for(let i=0;i<dataJson.length;i++){
            dataJson[i].active = false
        }
        this.setState({
            dataJson:dataJson,
            dataJsonAll:false,
            dataJsonName:this.props.dataJsonName,
            dataJsonValue:"",
            dataJsonShow:false,
        })
        return true;
    }

    componentWillUnmount() {
        var id = this.state.id;
        eventHub.remove("clearQuery",id)
        eventHub.remove("componentWillUnmount",id)
    }

    handleSpanClick(){
        let dataJsonShow = this.state.dataJsonShow;
        this.setState({
            dataJsonShow:!dataJsonShow
        })
    }
    handleInputClick(e){
        let value = e.target.value;
        let checkall = value===""?true:false;
            let dataJsonName = "";
            let dataJsonValue = "";
            let dataJsonAll = this.state.dataJsonAll;
            let dataJson = this.state.dataJson;
            if(checkall) {//点击全部
                dataJsonName = (!dataJsonAll)?"全部":"选择类别";
                for(let i=0;i<dataJson.length;i++){
                    dataJson[i].active = (!dataJsonAll);
                }
            }else{
                for(let i=0;i<dataJson.length;i++){
                    if((dataJsonAll?dataJson[i].value==="":false)||dataJson[i].value===value){
                        dataJson[i].active=dataJsonAll?false:!dataJson[i].active;
                    }
                }
                for(let i=0;i<dataJson.length;i++){
                    if(dataJson[i].active){
                        dataJsonName +=","+dataJson[i].name;
                        dataJsonValue +=","+dataJson[i].value;
                    }
                }
                if(dataJsonName!=""){
                    dataJsonName = dataJsonName.substring(1)
                    dataJsonValue = dataJsonValue.substring(1)
                }
            }
            dataJsonAll = checkall?(!dataJsonAll):(dataJsonAll?(!dataJsonAll):dataJsonAll)
            this.setState({
                dataJsonAll:dataJsonAll,
                dataJson:dataJson,
                dataJsonName:dataJsonName,
                dataJsonValue:dataJsonValue,
            })
        this.props.submitValue(this.props.name,dataJsonValue)
        }

    closeDiv(){
        this.setState({
            dataJsonShow:false,
        })
    }

    render() {
        return (
            <div style={{display:"inline-block"}}>
                <span name={this.props.name} className="advancend_query_input select_arrows overtext nwidth162" placeholder="请选择类别" onClick={this.handleSpanClick}>{this.state.dataJsonName}</span>
                <ul className={`advancend_query_selector_react nwidth162 ${this.props.dataCalss}`} style={{display:!this.state.dataJsonShow?"none":"block"}} onMouseLeave={this.closeDiv}>
                    {this.state.dataJson.map((obj) =>
                        <li key={obj.value}><label><input value={obj.value}  name="moneyState" className="advancend_query_selector_checkbox" checked={obj.active} type="checkbox" onClick={this.handleInputClick} readOnly/>{obj.name}</label></li>
                    )}
                </ul>
            </div>
        );
    }
}

class QueryContent extends  React.Component{
    constructor(props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.submitValue = this.submitValue.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
        this.neetClearQuery = this.neetClearQuery.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
        this.dateShow = this.dateShow.bind(this);
        this.handleLiClick = this.handleLiClick.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.showWdatePicker = this.showWdatePicker.bind(this);
        this.wdatePicker = this.wdatePicker.bind(this);
        this.state={
            id:"",
            billTypeJson:[
                {value:"",name:"全部",active:false},
                {value:"1",name:"开票",active:false},
                {value:"2",name:"冲红",active:false},
                {value:"3",name:"作废",active:false}
            ],
            billType:"",

            invoiceLineJson:[
                {value:"",name:"全部",active:false},
                {value:"1",name:"收据",active:false},
                {value:"2",name:"普票-纸质发票",active:false},
                {value:"3",name:"专票-纸质发票",active:false},
                {value:"4",name:"普票-电子发票",active:false},
                {value:"5",name:"专票-电子发票",active:false}
            ],
            invoiceLine:"",

            resultStateJson:[
                {value:"",name:"全部",active:false},
                {value:"0",name:"正在处理",active:false},
                {value:"1",name:"处理成功",active:false},
                {value:"2",name:"已重新申请",active:false},
                {value:"3",name:"已手动完成",active:false},
                {value:"4",name:"需要重试",active:false},
                {value:"5",name:"业务报错",active:false},
                {value:"-1",name:"处理失败",active:false}
            ],
            resultState:"",

            dateTypeJson:[
                {value:"1",name:"申请日期",active:false},
                {value:"2",name:"处理时间",active:false}
            ],
            dateRangeJson:[
                {value:"1",name:"1年内",active:true},
                {value:"3",name:"3年内",active:false},
                {value:"5",name:"5年内",active:false},
            ],
            dateType:1,
            dateTypeName:"申请日期",
            dateShow:false,
            dateRange:1,
            dateRangeName:"1年内",
            dateRangeShow:true,

            caseName:"",
            caseNo:"",
            billCode:"",
            billNo:"",

        }
    }

    showWdatePicker(){
        this.setState({
            dateRangeShow:false,
        })
    }

    wdatePicker(e){
        WdatePicker({el:e.target.id});
    }

    handleInputChange(e){
        let name = e.target.name;
        let value = e.target.value;
        if(name=="caseName"){this.setState({caseName:value,})}
        else if(name=="caseNo"){this.setState({caseNo:value,})}
        else if(name=="billCode"){this.setState({billCode:value,})}
        else if(name=="billNo"){this.setState({billNo:value,})}
    }

    handleInputKeyDown(e){
        if(e.keyCode==13){
            this.submitQuery()
        }
    }


    submitValue(name,value){
        if(name=="billType"){this.setState({billType:value,})}
        else if(name=="invoiceLine"){this.setState({invoiceLine:value,})}
        else if(name=="resultState"){this.setState({resultState:value,})}
        setTimeout(this.submitQuery,0);
    }

    componentDidMount() {
        var id=new Date().getTime() + Math.random()
        eventHub.on('neetClearQuery',id, this.neetClearQuery);
        this.setState({
            id:id,
        })
    }

    componentWillUnmount() {
        var id = this.state.id;
        eventHub.remove("neetClearQuery", id)
    }

    neetClearQuery(value){
        this.clearQuery(value)
    }

    clearQuery(value){
        eventHub.emit('clearQuery', value,null);
        this.setState({
            caseName:"",
            caseNo:"",
            billNo:"",
            billCode:"",

            billType:"",
            invoiceLine:"",
            resultState:"",

            dateType:1,
            dateTypeName:"申请时间",
            dateShow:false,

            dateRange:1,
            dateRangeName:"1年内",
            dateRangeShow:true,
        })
        setTimeout(this.submitQuery,0);
    }

    submitQuery(){
        var data={
            caseName:this.state.caseName,
            caseNo:this.state.caseNo,
            billCode:this.state.billCode,
            billNo:this.state.billNo,

            billType:this.state.billType,
            invoiceLine:this.state.invoiceLine,
            resultState:this.state.resultState,

            dateType:this.state.dateType,
            dateRange:this.state.dateRange,
            dateRangeShow:this.state.dateRangeShow,

        }
        this.props.submitQuery(data)
    }

    dateShow(){
        this.setState({
            dateShow:!this.state.dateShow,
        })
    }

    handleLiClick(e){
        let value = e.target.value;
        let dateTypeJson = this.state.dateTypeJson;
        let dateType = this.state.dateType;
        let dateTypeName = this.state.dateTypeName;
        for(let i=0;i<dateTypeJson.length;i++){
            if(dateTypeJson[i].value==value){
                dateType = value;
                dateTypeName = dateTypeJson[i].name;
            }
        }
        this.setState({
            dateType:dateType,
            dateTypeName:dateTypeName,
            dateShow:false,
        })
        setTimeout(this.submitQuery,0);
    }

    handleInputClick(e){
        let value = e.target.value;
        let dateRangeJson = this.state.dateRangeJson;
        let dateRange = this.state.dateRange;
        let dateRangeName = this.state.dateRangeName;
        for(let i=0;i<dateRangeJson.length;i++){
            dateRangeJson[i].active=false;
            if(dateRangeJson[i].value==value){
                dateRange = value;
                dateRangeName = dateRangeJson[i].name;
                dateRangeJson[i].active=true;
            }
        }
        this.setState({
            dateRange:dateRange,
            dateRangeName:dateRangeName,
            dateRangeJson:dateRangeJson,
        })
    }


    render(){
        return(
            <div className="advancend_query_warp" style={{borderBottom:"none"}}>
                <div className="advancend_query_row">
                    <div className="advancend_query_field">
                        <label className="advancend_query_label">申请来源</label>
                        <input name="caseName" className="advancend_query_input nwidth162"  placeholder="输入项目名称" type="text" title={this.state.caseName} value={this.state.caseName} onChange={this.handleInputChange} onKeyDown={this.handleInputKeyDown}/>
                        <input name="caseNo" className="advancend_query_input none_border_left nwidth162" placeholder="项目编号/合同号" type="text" title={this.state.caseNo} value={this.state.caseNo} onChange={this.handleInputChange} onKeyDown={this.handleInputKeyDown}/>
                    </div>
                    <div className="advancend_query_field">
                        <label className="advancend_query_label">申请类型</label>
                        <DropDownDox dataJson={this.state.billTypeJson} name="billType" submitValue={this.submitValue} dataJsonName="选择申请类型"/>
                        <DropDownDox dataJson={this.state.invoiceLineJson} name="invoiceLine" dataCalss="nwidth242" submitValue={this.submitValue} dataJsonName="申请发票类型"/>
                    </div>
                    <div className="advancend_query_field">
                        <label className="advancend_query_label">处理类型</label>
                        <DropDownDox dataJson={this.state.resultStateJson} name="resultState" submitValue={this.submitValue} dataJsonName="选择处理结果"/>
                    </div>
                </div>
                <div className="advancend_query_row">
                    <div className="advancend_query_field">
                        <label className="advancend_query_label">选择时间段</label>
                        <span name="advancendCaseDateType" className="advancend_query_input select_arrows overtext nwidth90" placeholder="日期" value={this.state.dateType} onClick={this.dateShow}>{this.state.dateTypeName}</span>
                        <ul className="advancend_query_selector_react nwidth90" style={{display:!this.state.dateShow?"none":"block"}}>
                            {this.state.dateTypeJson.map((obj) =>
                                <li key={obj.value} value={obj.value} onClick={this.handleLiClick}>{obj.name}</li>
                            )}
                        </ul>
                        <div className="advancend_query_input none_border_left nwidth252_391">
                            {this.state.dateRangeShow?
                                <div className="case_latelyTime">
                                    {this.state.dateRangeJson.map((obj) =>
                                        <label style={{cursor:"pointer"}} className="fl" key={obj.value}><input type="radio" name="caseLatelyYearRadio" value={obj.value} checked={obj.active} onClick={this.handleInputClick} readOnly/>{obj.name}</label>
                                    )}
                                    <span className="fr" style={{display:"inline-block",color:"#EA7771",paddingRight:"6px",cursor:"pointer"}} onClick={this.showWdatePicker}>选时间段</span>
                                </div>
                                :
                                <div>
                                    <span className="advancend_query_date select_arrows nwidth100_180" id="advancendCaseBeginDate" onClick={this.wdatePicker}></span>
                                    <span className="advancend_query_and">至</span>
                                    <span className="advancend_query_date select_arrows nwidth100_180" id="advancendCaseEndDate" onClick={this.wdatePicker}></span>
                                </div>
                            }

                        </div>
                    </div>
                    <div className="advancend_query_field">
                        <label className="advancend_query_label">发票信息</label>
                        <input name="billCode" className="advancend_query_input nwidth162"  placeholder="发票代码" type="text" title={this.state.billCode} value={this.state.billCode} onChange={this.handleInputChange} onKeyDown={this.handleInputKeyDown}/>
                        <input name="billNo" className="advancend_query_input none_border_left nwidth162" placeholder="发票号码" type="text" title={this.state.billNo} value={this.state.billNo} onChange={this.handleInputChange} onKeyDown={this.handleInputKeyDown}/>
                    </div>
                    <span className="advancend_query_btn" onClick={this.submitQuery}>搜索</span>
                    <label className="advancend_query_clear" onClick={this.clearQuery}>清空搜索条件</label>
                </div>
            </div>
        )
    }
}

class DataContent extends  React.Component{
    constructor(props) {
        super(props)
        this.updateData = this.updateData.bind(this);
        this.handleCLick = this.handleCLick.bind(this);
        this.state={
            list:this.props.dataList,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataList!== this.props.dataList) {
            this.updateData();
        }
    }

    handleCLick(e){
        let that = this;
        let id = e.currentTarget.id;
        let list = this.state.list;
        for(var i=0;i<list.length;i++){
            if(id==list[i].id){
                if(list[i].resultState==-1){//重新发起申请
                    let workValueId = list[i].workValueId;
                    let workId = list[i].workId;
                    let caseId = list[i].caseId;
                    let workName = list[i].applyItme;
                    let url = "lawyerCenter_workflow_workflowDoBill.action";
                    let data={
                        workValueId:workValueId,
                    }
                    var mask = new KinglexLoadMask();
                    mask.show();
                    $.ajax({
                        type:'post',
                        url:url,
                        data:data,
                        success:function(result){
                            mask.hide()
                            var json = eval("("+result+")");
                            if(json.success){
                                that.props.initWorkflowDoBill(json,workValueId,workName,workId,caseId,json.caseInvoiceElectronicsList)
                            }else{
                                if(null!=json.msg && "" != json.msg){
                                    KinglexAlert.alert(json.msg);
                               }
                            }
                        },
                        error:function(){
                            mask.hide()
                            console.log("发送请求失败")
                        }
                    })
                }else if(list[i].resultState==1 && (list[i].invoiceLine==4||list[i].invoiceLine==5)){//电子发票查看
                    if(list[i].invoiceFileUrl==""||list[i].invoiceFileUrl==null){
                        KinglexAlert.alert("电子发票获取中")
                    }else{
                        window.open(list[i].invoiceFileUrl)
                    }
                    break;
                }else if(list[i].resultState==1 && (list[i].invoiceLine==2||list[i].invoiceLine==3)){//纸质发票打印
                    window.open("lawyerCenter_financeBill_billShow.action?id="+id, "_blank");
                    //遮罩
                    this.props.billShow(id,list[i]);
                }else if(list[i].resultState==4){//重试
                    let dzfpId = list[i].id;
                    var config = {
                        isShowCancel:true,
                        content:"开票失败可能是由于未能连接到您的税盘，请确认诺诺发票软件已开启，确认后再点击重试",
                        isShowDelete:true,
                        ok:"发起重试",
                        fn:(isok)=>{
                            if('yes'==isok){
                                let mask = new KinglexLoadMask();
                                mask.show();
                                $.ajax({
                                    type: "post",
                                    url: "lawyerCenter_workflow_dzfpReInvoice.action",
                                    data: {
                                        dzfpId: dzfpId
                                    },
                                    success: (result) => {
                                        mask.hide();
                                        let json = eval("(" + result + ")");
                                        if (json.success) {
                                            KinglexAlert.tip("重试请求发送成功！");
                                            that.props.refreshListRe();
                                        } else {
                                            if (null != json.info && "" != json.info) {
                                                KinglexAlert.alert("重试请求发送失败！" + json.info);
                                            } else {
                                                KinglexAlert.alert("重试请求发送失败！");
                                            }
                                        }
                                    },
                                    error: () => {
                                        mask.hide();
                                        KinglexAlert.alert("发送请求失败！");
                                    }
                                });
                            }
                        }
                    }
                    KinglexAlert.confirm(config);
                }else{
                    break;
                }
            }
        }
    }
    updateData(){
        let list = this.props.dataList;
        this.setState({
            list:list,
        })
    }
    render(){
        return(
            <div className="main_finance">
                <div className="finance_main main_finance_right" style={{width:"1140px"}}>
                    <div className="finance_main_content_new">
                        <div className="ProjectIncome" style={{display: "block"}}>
                            <div id="downShowArea" style={{backgroundColor:"#fafafa"}}>
                                <div className="main_list_r_markedWords_top">
                                    <div className="finance_main_content_top clear">
                                        <div className="finance_main_content_line finance_main_content_topHeight" style={{background: "#fafafa"}}>
                                            <div className="finance_main_line twidth150_new"><p>申请时间</p></div>
                                            <div className="finance_main_line twidth180_340"><p>申请来源（审批事项）</p></div>
                                            <div className="finance_main_line twidth180_340"><p>申请内容</p></div>
                                            <div style={{    marginLeft: "15px"}} className="finance_main_line twidth65_new"><p>申请类型</p></div>
                                            <div className="finance_main_line twidth100_70"><p>申请金额</p></div>
                                            <div className="finance_main_line twidth65"><p>处理结果</p></div>
                                            <div className="finance_main_line twidth150_new"><p>处理时间</p></div>
                                            <div className="finance_main_line twidth180_200"><p>发票代码-发票号码</p></div>
                                            <div className="finance_main_line"><p>查看发票</p></div>
                                        </div>
                                    </div>
                                    {this.state.list.length>0?
                                        <ul className="finance_main_list">
                                            {this.state.list.map((obj) =>
                                                <li style={{position: "relative"}} key={obj.id} className={obj.delete?"finance_main_content_delete":null}>
                                                    <div className="finance_main_content_line">
                                                        <div className="finance_main_line twidth150_new"><p>{obj.applyTime}</p></div>
                                                        <div className="finance_main_line twidth180_340"><p className="overtext" title={obj.applyItme}>{obj.applyItme}</p></div>
                                                        <div className="finance_main_line twidth180_340">
                                                            <p className="overtext" title={(obj.billType==1?"": (obj.billType==2?"【冲红发票：":"【作废发票：")+((obj.invoiceCode==null||obj.invoiceCode==""||obj.invoiceCode==undefined)?"暂无代码":obj.invoiceCode)+"-"+((obj.invoiceNum==null||obj.invoiceNum==""||obj.invoiceNum==undefined)?"暂无号码":obj.invoiceNum)+"】")+ "【"+obj.payMoneyPerson+"】"+"【"+(obj.invoiceLine==4?"普通-电子发票":obj.invoiceLine==5?"专用-电子发票":obj.invoiceLine==2?"普通-纸质发票":obj.invoiceLine==3?"专用-纸质发票":"收据")+"】"}>
                                                                {obj.billType==1?null: (obj.billType==2?"【冲红发票：":"【作废发票：")+((obj.invoiceCode==null||obj.invoiceCode==""||obj.invoiceCode==undefined)?"暂无代码":obj.invoiceCode)+"-"+((obj.invoiceNum==null||obj.invoiceNum==""||obj.invoiceNum==undefined)?"暂无号码":obj.invoiceNum)+"】"}
                                                                【{obj.payMoneyPerson}】
                                                                【{obj.invoiceLine==4?"普通-电子发票":obj.invoiceLine==5?"专用-电子发票":obj.invoiceLine==2?"普通-纸质发票":obj.invoiceLine==3?"专用-纸质发票":"收据"}】
                                                            </p>
                                                        </div>
                                                        <div style={{    marginLeft: "15px"}} className="finance_main_line twidth65_new" >
                                                            <p style={{color:obj.applyTypeColor}}>
                                                                {obj.billType==1?"开票":obj.billType==2?"冲红":"作废"}
                                                            </p>
                                                        </div>
                                                        <div className="finance_main_line twidth100_70">
                                                            <p style={{color:obj.applyTypeColor}} title={obj.billMoney}>
                                                                {obj.billMoney}
                                                            </p>
                                                        </div>
                                                        <div className="finance_main_line twidth65">
                                                            <p style={{color:obj.resultColor}}>
                                                                {obj.resultState==1?"处理完成":obj.resultState==-1?"处理失败":obj.resultState==2?"已重新申请":obj.resultState==3?"已手动完成":obj.resultState==0?"正在处理":obj.resultState==4?"需要重试":obj.resultState==5?"业务报错":"-"}
                                                            </p>
                                                        </div>
                                                        <div className="finance_main_line twidth150_new"><p>{(obj.time==null||obj.time==""||obj.time==undefined)?"暂无处理时间":obj.time}</p></div>
                                                        <div className="finance_main_line twidth180_200"><p className="overtext" title={((obj.invoiceCode==null||obj.invoiceCode==""||obj.invoiceCode==undefined)?"暂无代码":obj.invoiceCode)+"-"+((obj.invoiceNum==null||obj.invoiceNum==""||obj.invoiceNum==undefined)?"暂无号码":obj.invoiceNum)}>{(obj.invoiceCode==null||obj.invoiceCode==""||obj.invoiceCode==undefined)?"暂无代码":obj.invoiceCode}-{(obj.invoiceNum==null||obj.invoiceNum==""||obj.invoiceNum==undefined)?"暂无号码":obj.invoiceNum}</p></div>
                                                        <div className="finance_main_line" id={obj.id} onClick={this.handleCLick} style={{cursor:"pointer"}}>
                                                            <p>{obj.resultState==-1?"重新申请":
                                                                obj.resultState==1?(
                                                                    (obj.invoiceLine==4||obj.invoiceLine==5)?<img style={{width:"20px",height:"24px",marginTop: "10.5px",marginLeft: "5px"}} src="lawyercenter/images/dzfpPdf.png" ></img>:
                                                                        (obj.isPrint==0)?<img style={{width:"28px",height:"28px",marginTop: "8.5px",marginLeft: "5px"}} src="lawyercenter/images/zzfpPdf0.png"></img>:<img style={{width:"28px",height:"28px",marginTop: "8.5px",marginLeft: "5px"}} src="lawyercenter/images/zzfpPdf1.png"></img>
                                                                ):(obj.resultState==4?"重试":null)
                                                            }</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>:
                                        <div className="not_data" style={{height: "320px",marginBottom:"0px"}}><p>暂无数据</p></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class PageNuber extends React.Component{
    constructor(props) {
        super(props);
        this.goToPage = this.goToPage.bind(this);
        this.goToPageByCurPage = this.goToPageByCurPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            page:1,
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.curPage!== this.props.curPage) {
            this.setState({
                page:this.props.curPage,
            })
        }
    }

    goToPage(){
        this.props.submitPage(this.state.page)
    }

    goToPageByCurPage(e){
        if(e.target.id=="nextPage" && this.props.curPage === this.props.pageNum){
            return
        }else if(e.target.id=="beforePage" && 1 === this.props.curPage){
            return
        }else{
            this.props.submitPage(e.target.id=="nextPage"?this.props.curPage+1:this.props.curPage-1)
        }
    }

    handleChange(e){
        this.setState({
            page:(e.target.value)*1,
        })
    }

    render(){
        return(
            <div className="page_warp">
                <div className="page_warp_left">共找到<i>{this.props.count}</i>条结果，每页显示&nbsp;{this.props.pageSize}&nbsp;条，共&nbsp;{this.props.pageNum}&nbsp;页</div>
                <div className="page_warp_right">
                    <a href="#" className="page_warp_right_btn" onClick={this.goToPage}>跳转</a>
                    <input type="text" id="totopagepage" name="totopagepage" value={this.state.page} onChange={this.handleChange}  className="page_warp_right_input" onKeyUp={this.goToPage}/>
                    <a href="#" className={`page_warp_right_btn ${this.props.curPage === this.props.pageNum ? 'btn_disable' : ''}`} onClick={this.goToPageByCurPage} id="nextPage">下一页</a>
                    <a href="#" className={`page_warp_right_btn ${1 === this.props.curPage ? 'btn_disable' : ''}`} onClick={this.goToPageByCurPage} id="beforePage">上一页</a>
                    <label className="page_warp_right_txt">当前&nbsp;{this.props.curPage}/{this.props.pageNum}&nbsp;页</label>
                </div>
            </div>
        )
    }
}


class DzfpFinanceBillList extends React.Component{
    render(){
        return(
            <div style={{    marginLeft: "30px"}}>
                <div style={{marginTop: "20px",marginBottom: "10px"}}>
                    {this.props.initWorkName},处理失败的是：
                </div>
                <div>
                    {this.props.initDzfpFinanceBills.map((obj) =>
                        <p style={{    lineHeight: "25px"}} key={obj.id}>
                            <span style={{    display: "inline-block"}}>{obj.billType==1?"蓝字":obj.billType==2?"红字":"作废"}发票金额为 </span>
                            <span style={{color:obj.color,display: "inline-block"}}>{MoneyFormatUtil.numberFormatNew(obj.billMoney)}</span>
                            <span style={{    display: "inline-block"}}> 元（</span>
                            <span style={{color:obj.color,display: "inline-block"}}>
                                {obj.billType==1?MoneyFormatUtil.toChinese(obj.billMoney):obj.invoiceCode+"-"+obj.invoiceNum}
                            </span>
                            <span style={{    display: "inline-block"}}>）</span>
                            <span style={{color:"#FF0000",display: "inline-block"}}>——失败原因：{obj.failDescribe}</span>
                        </p>
                    )}
                </div>
            </div>
        )
    }
}

class DzfpCenter extends React.Component{
    constructor(props) {
        super(props);
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.closeBillShow = this.closeBillShow.bind(this);
        this.closeBillAppoval = this.closeBillAppoval.bind(this);
        this.finishBillShow = this.finishBillShow.bind(this);
        this.billShow = this.billShow.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
        this.submitPage = this.submitPage.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getdataList = this.getdataList.bind(this);
        this.initWorkflowDoBill = this.initWorkflowDoBill.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.refreshListRe = this.refreshListRe.bind(this);
        this.state={
            titleValue:1,
            billShow:false,
            billApproval:false,
            workName:null,
            workType:null,
            workValueId:null,
            workId:null,
            caseId:null,
            dzfpFinanceBills:[],
            id:null,
            dataList:[],
            count:null,
            pageSize:20,
            pageNum:null,
            curPage:null,
            isLoadJquery:false,
            queryData:{},
            keyId:null
        }
    }

    componentDidMount() {
        var keyId=new Date().getTime() + Math.random()
        eventHub.on('closeBillAppoval',keyId, this.closeBillAppoval);
        eventHub.on('refreshList',keyId, this.refreshList);
        this.setState({
            keyId:keyId
        })
        this.submitPage(1)
    }


    componentWillUnmount(){
        var keyId = this.state.keyId;
        eventHub.remove("closeBillAppoval",keyId)
        eventHub.remove("refreshList",keyId)
        this.setState = (state,callback)=>{
            return;
        };
    }

    handleTitleClick(value){
        eventHub.emit("neetClearQuery",value,null)
        this.setState({
            titleValue:value,
        })
    }

    billShow(id,data){
        let isPrint = data.isPrint;
        this.setState({
            billShow: isPrint==false?true:false,
            id:id,
        })
    }

    closeBillShow(){
        this.setState({
            id:null,
            billShow: false,
        })
    }

    refreshList(page){
       this.closeBillAppoval();
        setTimeout(this.submitPage(page),0);
    }

    refreshListRe(){
        setTimeout(this.submitPage(this.state.curPage),0);
    }

    closeBillAppoval(){
        this.setState({
            workType:null,
            workName:null,
            workValueId:null,
            workId:null,
            caseId:null,
            billApproval:false,
            dzfpFinanceBills:null,
        })
    }

    finishBillShow(){
        var that = this;
        var id = this.state.id;
        $.ajax({
            url:"lawyerCenter_financeBill_billPrint.action",
            type:"post",
            data:{
                id:id
            },
            success:function(result){
                var json = eval("("+result+")");
                if(json.success){
                    that.submitPage(that.state.curPage)
                }else{
                    KinglexAlert.alert("更新出错："+json.info)
                }
                that.setState({
                    id:null,
                    billShow: false,
                })
            },
            error:function(){
                that.setState({
                    id:null,
                    billShow: false,
                })
            }
        })
    }

    submitQuery(data){
        this.loadData(data,1)
        this.setState({
            queryData:data,
        })
    }

    submitPage(page,value){
        let queryData = this.state.queryData;
        if($.isEmptyObject(queryData)){
            queryData = {
                caseName: "",
                caseNo: "",
                billCode: "",
                billNo: "",

                billType: "",
                invoiceLine: "",
                resultState: "",

                dateType: 1,
                dateRange: 1,
                dateRangeShow: true
            }
            this.setState({
                queryData:queryData,
            })
        }
        this.loadData(queryData,page,value)
    }

    loadData(data,page,value){
        var queryVaule = value==null?this.state.titleValue:value;
        var that = this;
        var url="lawyerCenter_financeBill_dzfpList.action";
        var data={
            query:JSON.stringify(data),
            page:page,
            advancendCaseBeginDate        : $("#advancendCaseBeginDate").html(),
            advancendCaseEndDate          : $("#advancendCaseEndDate").html(),
            titleValue:queryVaule
        }
        var mask = new KinglexLoadMask();
        mask.show();
        $.ajax({
            url:url,
            type:"post",
            data:data,
            success:function (result) {
                mask.hide()
                var json = eval("("+result+")");
                if(json.success){
                    let count = json.map[0].rowcount
                    let list = json.map[0].list
                    that.getdataList(list,count,page)

                }else{
                    KinglexAlert.alert("查询出错")
                }
            },
            error:function (result) {
                mask.hide()
            }
        })
    }

    getdataList(list,count,page){
        let dataList = [];
        if(list!=null && list.length>0){
            for(let i=0;i<list.length;i++){
                let eBill = list[i][0];
                let work = list[i][1];
                let eApply = list[i][2];
                let billType = eBill.billType;
                let resultState = eBill.resultState;
                let applyTypeColor = billType==1?"#0066CC":billType==2?"#EA7771":"#666666";
                let resultColor = resultState==1?"#20B759":billType==-1?"#FF0000":"#666666";
                let gray = resultState==2?true:false;
                let data= {
                        id:eBill.id,
                        caseId:eApply.caseId,
                        workId:work.id,
                        workValueId:eApply.workValueId,
                        applyTime:eBill.createTime,
                        applyItme:work.workName,
                        payMoneyPerson:eBill.buyerName,
                        invoiceLine:eBill.invoiceLine,
                        isPrint:eBill.isPrint,
                        billType:billType,
                        applyTypeColor:applyTypeColor,
                        billMoney:eBill.billMoney+"",
                        resultState:resultState,
                        resultColor:resultColor,
                        time:eBill.handleTime,
                        invoiceCode:eBill.invoiceCode,
                        invoiceNum:eBill.invoiceNum,
                        delete:gray,
                        invoiceFileUrl:eBill.invoiceFileUrl,
                }
                dataList.push(data)
            }
        }
        this.setState({
            dataList:dataList,
            count:count,
            pageNum:Math.ceil(count/this.state.pageSize),
            curPage:page,
        })
    }

    initWorkflowDoBill(json,workValueId,workName,workId,caseId,caseInvoiceElectronicsList){
        $("#caseInvoiceElectronicsListJSON").val(JSON.stringify(caseInvoiceElectronicsList))
        let workType = json.workType;
        let dzfpFinanceBills = json.dzfpFinanceBills;
        let isLoadJquery = this.state.isLoadJquery;
        if(!isLoadJquery) {
            var $xelgnik = $.noConflict();
            var jQueryxelgnik = jQuery.noConflict();
            $.ajax({
                cache: true,
                async: false,
                url: "lawyercenter/js/debug/jquery-3.5.1.min.js",
                dataType: "script"
            })
            var $$ = $.noConflict();
            $ = $xelgnik;
            jQuery = jQueryxelgnik;
            $$.ajax({
                cache: true,
                async: false,
                url: "lawyercenter/js/debug/component_workflow.js",
                dataType: "script"
            })
            $$.ajax({
                cache:true,
                async: false,
                url:"lawyercenter/js/debug/page_workflow_invoiceDo.js",
                dataType:"script"
            })
            $$.ajax({
                cache:true,
                async: false,
                url:"lawyercenter/js/debug/page_workflow_redInvoiceDo.js",
                dataType:"script"
            })

        }
        this.setState({
            caseId:caseId,
            workId:workId,
            workType:workType,
            workName:workName,
            workValueId:workValueId,
            billApproval:true,
            dzfpFinanceBills:dzfpFinanceBills,
            isLoadJquery:true
        })
        setTimeout(function () {
            $("#addWithdrawRecordAlert").show()
            eventHub.emit('isShowInvoiceView', null,null);
        }, 0);
    }

    render(){
        return(
            <div>
                <TitleContent handleTitleClick={this.handleTitleClick}></TitleContent>
                <QueryContent submitQuery={this.submitQuery}></QueryContent>
                <DataContent dataList={this.state.dataList}billShow={this.billShow} initWorkflowDoBill={this.initWorkflowDoBill} refreshListRe={this.refreshListRe}></DataContent>
                <PageNuber submitPage={this.submitPage} count={this.state.count} pageSize={this.state.pageSize} pageNum={this.state.pageNum}curPage={this.state.curPage}></PageNuber>
                {this.state.billShow?
                <div className="alert_page flushCurPage" style={{display: "block"}}>
                    <div className="alert_page_mask" style={{zIndex: "25002"}}></div>
                    <div className="alert_page_content" style={{width: "500px",height: "300px",zIndex: "25003"}}>
                        <div className="claim_show_title">
                            <p>纸质发票打印提示</p>
                            <div className="close_modal" style={{top:"20px",right:"30px"}} onClick={this.closeBillShow}></div>
                        </div>
                        <div>
                            <div
                                style={{width: "470px",height: "30px",lineHeight: "30px",marginTop: "30px",textAlign:" center",fontSize: "14px"}}>您是否已打印完成？
                            </div>
                        </div>
                        <div style={{marginTop: "65px"}}>
                            <div style={{float:"left",backgroundColor: "#e4e4e4",height: "40px",width: "115px",lineHeight: "40px",textAlign: "center",color: "#999",borderRadius: "5px",marginLeft: "100px"}} onClick={this.closeBillShow}>暂未完成</div>
                            <div style={{float:"left",backgroundColor: "#ea7771",height: "40px",width: "115px",lineHeight: "40px",textAlign: "center",color: "#fff",borderRadius: "5px",marginLeft: "20px"}} onClick={this.finishBillShow}>确认完成</div>
                        </div>
                    </div>
                </div>:null}
                {this.state.billApproval?
                    <div id="addWithdrawRecordAlert" style={{display:"none"}}>
                        <div>
                            <input name="workValueId" type="hidden" value={this.state.workValueId} readOnly/>
                            <input name="workId" type="hidden" value={this.state.workId} readOnly/>
                            <input name="caseId" type="hidden" value={this.state.caseId} readOnly/>
                            <input name="workflow_workValueId" type="hidden" value={this.state.workValueId} readOnly/>
                            <div id="billApproval">
                                {this.state.workType==2011?
                                    <WorkflowSumbitBlock></WorkflowSumbitBlock>:
                                    <RedInvoiceView></RedInvoiceView>
                                }
                            </div>
                        </div>
                    </div>
                    :null}
            </div>
        )
    }
}

ReactDOM.render(
    <DzfpCenter/>, document.getElementById('root')
);

