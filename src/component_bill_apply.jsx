class BillTypeRadio extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.onValueClick(e.target.value);
    }

    render() {
        return (
            <label className={`check_label dis_in_block fl ${1 === this.props.active ? 'billinfo_selected' : ''}`} style={{marginLeft: "0px",marginRight: "20px",cursor:"pointer"}}>
                <input type="radio" name="billType" value={this.props.value} onClick={this.handleClick} readOnly checked={1 === this.props.active ? 'checked' : ''}/>
                {this.props.title}
            </label>
        );
    }
}

//开票发票抬头输入框组件
class BillInputReact extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleChange(e) {
        if(this.props.onValueChange!=null){
            this.props.onValueChange(e.target.name, e.target.value)
        }
    }
    handleBlur(e) {
        if(this.props.onValueBlur!=null){
            this.props.onValueBlur(e.target.name, e.target.value)
        }
    }
    render() {
        return (
            <input autoComplete="off" type="text" disabled={this.props.disabled} name={this.props.name} className={this.props.class+" overtext"} placeholder={this.props.placeholder} title={this.props.value} value={this.props.value} onChange={this.handleChange} style={this.props.style} onBlur={this.handleBlur}/>
        );
    }
}


class BillTypePerson extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.selectTitle(this.props.clientid,this.props.clienttype,this.props.clientname);
    }

    render() {
        return (
            <li  clientid={this.props.clientid} clientyype={this.props.clienttype} onClick={this.handleClick} className="overtext" title={this.props.clientname}>{this.props.clientname}</li>
        );
    }
}

class BillTypeDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc:"lawyercenter/images/ico/small_"+getIco(this.props.ext)+".png",
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.selectDoc(this.props.docId,this.props.filename,this.props.fileSize,this.props.ext);
    }

    render() {
        return (
            <div className="journal_related_line clear" style={{position:"relative"}} data-id={this.props.docId} data-filename={this.props.filename} data-filesize={this.props.fileSize} data-ext={this.props.ext}>
                <img className="doc_related_img" style={{margin: "3px 0 3px 4px"}} src={this.state.imgSrc}/>
                <div className="doc_related_l_r">
                    <div style={{width:"640px",float:"left"}}>
                        <p onClick={this.handleClick} className="doc_related_l_text overtext" style={{padding:"0 20px 0 6px",lineHeight:"30px",width:"auto",float:"none"}} title={this.props.filename}>{this.props.filename}</p>
                    </div>
                </div>
                <div style={{display:"none",top:"0px",right:"150px"}} className="Green_img"></div>
            </div>
        );
    }
}

class BillInfo extends React.Component{
    constructor(props) {
        super(props);
        this.handleValueClick = this.handleValueClick.bind(this);
        this.showTax = this.showTax.bind(this);
        this.showTipFunction = this.showTipFunction.bind(this);
        this.speedBill = this.speedBill.bind(this);
        this.speedBillInfo = this.speedBillInfo.bind(this);
        this.getCaseInfoViewReact = this.getCaseInfoViewReact.bind(this);
        this.selectCaseCallBack = this.selectCaseCallBack.bind(this);
        this.preSelectCaseCallBack = this.preSelectCaseCallBack.bind(this);
        this.loadCorpId = this.loadCorpId.bind(this);
        this.preprocessingInvoiceInfo = this.preprocessingInvoiceInfo.bind(this);
        this.preprocessingInvoiceInfoReSend = this.preprocessingInvoiceInfoReSend.bind(this);
        this.preprocessingExpectMoneyList = this.preprocessingExpectMoneyList.bind(this);
        this.loadExpectMoneyList = this.loadExpectMoneyList.bind(this);
        this.loadExpendPercentList = this.loadExpendPercentList.bind(this);
        this.loadCaseClient = this.loadCaseClient.bind(this);
        this.disableTaxInfo = this.disableTaxInfo.bind(this);
        this.disableTaxInfoGov = this.disableTaxInfoGov.bind(this);
        this.disableTaxInfoClick = this.disableTaxInfoClick.bind(this);
        this.openPayMoneyPerson = this.openPayMoneyPerson.bind(this);
        this.anotherTitle = this.anotherTitle.bind(this);
        this.selectTitle = this.selectTitle.bind(this);
        this.loadTaxInfo = this.loadTaxInfo.bind(this);
        this.checkJskpBtn = this.checkJskpBtn.bind(this);
        this.hideJskpBtn = this.hideJskpBtn.bind(this);
        this.showJskpBtn = this.showJskpBtn.bind(this);
        this.checkJskp = this.checkJskp.bind(this);
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleClientMouseLeave = this.handleClientMouseLeave.bind(this);
        this.handleTaxChange = this.handleTaxChange.bind(this);
        // this.isSend = this.isSend.bind(this);
        this.uploadInit = this.uploadInit.bind(this);
        this.closeUpdFile = this.closeUpdFile.bind(this);
        this.completeUpdDoc = this.completeUpdDoc.bind(this);
        this.removeDoc = this.removeDoc.bind(this);

        this.existDocument = this.existDocument.bind(this);
        this.showDocMore = this.showDocMore.bind(this);
        this.showDocMoreKeyDown = this.showDocMoreKeyDown.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.showDocMore20 = this.showDocMore20.bind(this);
        this.generateDocHtml = this.generateDocHtml.bind(this);
        this.handleSelectDoc = this.handleSelectDoc.bind(this);
        this.closeDocument = this.closeDocument.bind(this);

        this.validatorData = this.validatorData.bind(this);
        this.initOhterData = this.initOhterData.bind(this);
        this.initBillInfo = this.initBillInfo.bind(this);
        this.initBillType = this.initBillType.bind(this);
        this.loadHideMoneyList = this.loadHideMoneyList.bind(this);
        this.deleteComponent = this.deleteComponent.bind(this);
        this.judageBillType = this.judageBillType.bind(this);
        this.state = {
            type:0,
            id:null,
            webuploader:null,
            doc:[],
            index:0,
            length:0,
            billTypeinfo:[],
            billType:null,
            clientArray:[],
            isBillTitleDoc:true,
            isKpNameArray:[],// 保存开票成功后的数组

            //组件数据的维护
            cropId:"",
            cropName:"",
            caseId:"",
            caseName:"",
            caseType:"",

            titleType:"",
            payMoneyPerson:"",
            newCompanyName:"",
            newIndivName:"",
            custNo:"",
            custType:"",

            org_address:"",
            org_tel:"",
            org_taxNo:"",
            org_bank:"",
            org_bankaccount:"",
            jskpCode:"",

            coustomerPhone:"",
            coustromerEmail:"",

            //文档数据
            docId:"",
            fileImg:"",
            fileSize:"",
            fileName:"",
            fileSrc:"",

            // 组件元素的显示控制
            titleIsDiffDiv:false,//发票抬头说明文档
            payMoneyPersonDiv:true,//原有客户下拉区域
            newCompanyNameDiv:false,//另一个公司
            newIndivNameDiv:false,//另一个人
            showPerson:false,//点击事件下拉框显示与隐藏
            disableTax:false,//是否不可点击
            isGov:false,//是否政府企业
            isCoustomer:true,//是否通知客户
            existDocumentDiv:false,//项目文档是否显示

            showTip:false,
            isShowTax:false,
        };
    }

    loadHideMoneyList(){
        //加载应收款信息显示
        this.preprocessingExpectMoneyList(this.state.caseId);

        // 加载应收款
        this.loadExpectMoneyList(this.state.caseId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.initData!== this.props.initData) {
            this.initBillInfo();
        }
        if (prevProps.billType!== this.props.billType || prevProps.email!== this.props.email || prevProps.tel!== this.props.tel) {
            this.initBillType();
        }
    }

    judageBillType(){
        let custType = this.state.custType;
        let billType = this.state.billType;
        if(custType=="2" && (billType=="3"||billType=="5")){//专票个人
            KinglexAlert.alert('个人客户不能开增值税专用发票！');
            billType=2
            let billTypeinfo = this.state.billTypeinfo;
            let tel = this.props.tel;
            let email = this.props.email;
            let isflag = false;
            for(var i=0;i<billTypeinfo.length;i++){
                if(billTypeinfo[i].value==billType){
                    isflag = true;
                    billTypeinfo[i].active=1;
                    let billTypeimg = billTypeinfo[i].img
                    this.props.onBillTypeImg(billTypeimg)
                }else{
                    billTypeinfo[i].active=0;
                }
            }
            if(!isflag){
                billTypeinfo[0].active=1;
                let billTypeimg = billTypeinfo[0].img;
                billType = billTypeinfo[0].value;
                this.props.onBillTypeImg(billTypeimg)
            }
            this.setState({
                billTypeinfo:billTypeinfo,
                billType:billType,
                coustomerPhone:tel,
                coustromerEmail:email,
            })
        }
    }

    initBillType(){
        let billTypeinfo = this.state.billTypeinfo;
        let custType = this.state.custType;
        let isGov = this.state.isGov;
        let billType = this.props.billType;
        let tel = this.props.tel;
        let email = this.props.email;
        let isflag = false;
        for(var i=0;i<billTypeinfo.length;i++){
            if(billTypeinfo[i].value==billType){
                isflag = true;
                billTypeinfo[i].active=1;
                let billTypeimg = billTypeinfo[i].img
                this.props.onBillTypeImg(billTypeimg)
            }else{
                billTypeinfo[i].active=0;
            }
        }
        if(!isflag){
            billTypeinfo[0].active=1;
            let billTypeimg = billTypeinfo[0].img;
            billType = billTypeinfo[0].value;
            this.props.onBillTypeImg(billTypeimg)
        }
        if((billType==2||billType==4) && custType== 1){//纸普 电普
            this.showTipFunction(true);
            this.disableTaxInfoGov(isGov);
        }else if(billType==2||billType==4){
            this.showTipFunction(false)
            this.disableTaxInfo(true);
        }else{
            this.showTipFunction(false)
        }
        this.setState({
            billTypeinfo:billTypeinfo,
            billType:billType,
            coustomerPhone:tel,
            coustromerEmail:email,
        })
    }

    initBillInfo(){
        let financeStartWork = this.props.initData.financeStartWork;
        let docId = financeStartWork.billRiseDocId;
        let titleIsDiffDiv = docId!=""?true:false;
        // let isCoustomer = financeStartWork.dzfpPhone!=""?true:false;
        // let isCoustomer = true
        let isGov = financeStartWork.isGov==1?true:false;
        let disableTax = financeStartWork.isGov==1?true:false;
        let titleType = financeStartWork.titleType;
        let taxNo = financeStartWork.taxNo;
        let billTypeinfo = this.state.billTypeinfo;
        let billType = financeStartWork.billType;
        let isflag = false;
        for(var i=0;i<billTypeinfo.length;i++){
            if(billTypeinfo[i].value==billType){
                isflag = true;
                billTypeinfo[i].active=1;
                let billTypeimg = billTypeinfo[i].img
                this.props.onBillTypeImg(billTypeimg)
            }else{
                billTypeinfo[i].active=0;
            }
        }
        if(!isflag){
            billTypeinfo[0].active=1;
            let billTypeimg = billTypeinfo[0].img;
            billType = billTypeinfo[0].value;
            this.props.onBillTypeImg(billTypeimg)
        }
        var payMoneyPerson = "";
        var newCompanyName = "";
        var newIndivName = "";
        var payMoneyPersonDiv = false;
        var newCompanyNameDiv = false;
        var newIndivNameDiv = false;
        if(titleType==1){
            payMoneyPersonDiv  = true;
            payMoneyPerson = financeStartWork.payMoneyPerson;
        }else if(titleType==3){
            if(taxNo=="" && !isGov){
                newIndivName = financeStartWork.payMoneyPerson;
                newIndivNameDiv = true
            }else{
                newCompanyName = financeStartWork.payMoneyPerson;
                newCompanyNameDiv = true
            }
        }
        let caseInfo = this.props.initData.caseInfo;
        let arrayClientIdtemp = caseInfo.clientid.split(",");
        let arrayClientNametemp = caseInfo.client.split(",");
        let arrayClientTypetemp = caseInfo.clientType.split(",");
        let custNo="";
        let custType="";
        if(financeStartWork.titleType!=2){
            for(let i=0;i<arrayClientNametemp.length;i++){
                if(arrayClientNametemp[i]==financeStartWork.payMoneyPerson){
                    custType = arrayClientTypetemp[i];
                    custNo = arrayClientIdtemp[i];
                    break;
                }
            }
        }
        var clientArray=[];
        for(let i=0;i<arrayClientNametemp.length;i++){
            var clientType = arrayClientTypetemp[i];
            var clientId = arrayClientIdtemp[i];
            var clientName = arrayClientNametemp[i];
            var obj = {
                clientidtype:clientType,
                clientid:clientId,
                clientName:clientName,
            };
            clientArray.push(obj);
        }
        if(titleType==3){
            let document = this.props.initData.document;
            if(null!=document){
                let fileName = document.filename;
                let size = document.fileSize;
                let ext = document.ext;
                this.completeUpdDoc(docId,fileName,size,ext);
            }else{
                titleIsDiffDiv = true;
            }
        }

        if((billType==2||billType==4) && custType== 1){//纸普 电普
            this.showTipFunction(true);
            this.disableTaxInfoGov(isGov);
            if(""!=financeStartWork.taxAddress||""!=financeStartWork.taxTel||""!=financeStartWork.taxBank||""!=financeStartWork.taxBankAccount){
                this.showTax()
            }
        }else if(billType==2||billType==4){
            this.showTipFunction(false)
            this.disableTaxInfo(true);
        }else{
            this.showTipFunction(false)
        }


        this.setState({
            type:1,
            id:financeStartWork.id,
            billType:billType,
            caseId:financeStartWork.caseId,
            caseName:financeStartWork.caseName,
            titleType:titleType,
            jskpCode:financeStartWork.taxKpCode,
            org_address:financeStartWork.taxAddress,
            org_tel:financeStartWork.taxTel,
            org_taxNo:taxNo,
            org_bank:financeStartWork.taxBank,
            org_bankaccount:financeStartWork.taxBankAccount,
            coustomerPhone:financeStartWork.dzfpPhone,
            coustromerEmail:financeStartWork.dzfpEmail,
            docId:docId,
            titleIsDiffDiv:titleIsDiffDiv,
            isGov:isGov,
            // isCoustomer:isCoustomer,
            disableTax:disableTax,
            billTypeinfo:billTypeinfo,
            payMoneyPerson:payMoneyPerson,
            newCompanyName:newCompanyName,
            newIndivName:newIndivName,
            payMoneyPersonDiv:payMoneyPersonDiv,
            newCompanyNameDiv:newCompanyNameDiv,
            newIndivNameDiv:newIndivNameDiv,
            custType:custType,
            custNo:custNo,
            clientArray:clientArray,
        })
        // eventHub.emit('defaultCaseId', {defaultCaseId:financeStartWork.caseId,defaultCaseName:financeStartWork.caseName},null);
        this.loadCorpId(financeStartWork.caseId);

        // 预处理发票信息
        this.preprocessingInvoiceInfoReSend(financeStartWork.caseId);
    }

    handleValueClick(value){
        let billTypeinfo = this.state.billTypeinfo
        let titleType = this.state.titleType
        if(titleType=="1"){
            var custType = this.state.custType;
            if(value==3||value==5){ // 增值税发票
                this.showTipFunction(false)
                if(custType=="2"){ // 个人客户
                    KinglexAlert.alert('个人客户不能开增值税专用发票！');
                    return;
                }
            }else if(value==2||value==4){ // 普通发票
                if(custType=="2"){ // 个人客户
                    this.showTipFunction(false)
                    this.disableTaxInfo(true);
                }else{
                    this.showTipFunction(true);
                    this.disableTaxInfoGov(this.state.isGov);
                }
            }
        }else if(titleType=="3"){
            if(value==3||value==5){ // 增值税发票
                this.showTipFunction(false)
                if(this.state.newIndivNameDiv==true){
                    KinglexAlert.alert('个人客户不能开增值税专用发票！');
                    return;
                }
            }else if(value==2|| value==4){ // 普通发票
                if(this.state.newIndivNameDiv==true){ // 使用其他个人作为发票抬头
                    this.showTipFunction(false)
                    this.disableTaxInfo(true);
                }else if(this.state.newCompanyNameDiv==true){ // 使用另一公司作为发票抬头
                    this.showTipFunction(true);
                    this.disableTaxInfoGov(this.state.isGov);
                }
            }
        }

        for(var i=0;i<billTypeinfo.length;i++){
            if(billTypeinfo[i].value==value){
                billTypeinfo[i].active=1
                let billTypeimg = billTypeinfo[i].img
                this.props.onBillTypeImg(billTypeimg)
            }else{
                billTypeinfo[i].active=0
            }
        }
        this.setState({
            billTypeinfo: billTypeinfo,
            billType:value,
        })
    }

    disableTaxInfoClick(){ //企业才会触发这个 ff or tt 可选与不可选
        let isGov = !this.state.isGov;
        this.disableTaxInfoGov(isGov)
    }

    disableTaxInfoGov(bool){
        this.setState({
            isGov:bool,
            disableTax:bool,
        })
    }

    disableTaxInfo(bool){
        this.setState({
            isGov:false,
            disableTax:bool,
        })
    }
    showTipFunction(value){
        if(!value){
            this.setState({
                showTip: false,
                isShowTax: false,
            })
        }else{
            this.setState({
                showTip: true
            })
        }
    }

    showTax(){
        this.setState({
            isShowTax: true
        })
    }

    getCaseInfoViewReact(e) {
        var eTarget = e.target;
        var obj=null;
        if(eTarget.id=="selector_case"){
            obj = eTarget;
        }else{
            obj = $(eTarget).parents("#selector_case")
        }
        getCaseInfoView(obj,'caseId','caseName','caseType',this.selectCaseCallBack)
    }

    preSelectCaseCallBack(json){
        var sourceId = json.defaultCaseId;
        var sourceName = json.defaultCaseName;
        editCaseNameDivReact($("#selector_case"),"caseId","caseName","caseType",sourceId,sourceName,1);
        this.selectCaseCallBack(sourceId, sourceName, 1)
    }

    selectCaseCallBack(sourceId, sourceName, sourceType) {
        this.setState({
            caseId:sourceId,
            caseType:sourceType,
            caseName:sourceName,
        })
        // 加载应收款
        if(sourceType==1){

            this.loadCorpId(sourceId);

            // 预处理发票信息
            this.preprocessingInvoiceInfo(sourceId);

            //加载应收款信息显示
            this.preprocessingExpectMoneyList(sourceId);

            // 加载应收款
            this.loadExpectMoneyList(sourceId);

            // 加载分配比例
            this.loadExpendPercentList(sourceId);

            if(ApplyForInvoice!=null){
                // 加载流程
                var workValueId = $("input[name='workValueId']").val();
                if(workValueId==null || workValueId==""){	// 值为空表示申请开票
                    ApplyForInvoice.getWorkFlow();
                }
            }
        }
    }

    loadCorpId(sourceId){
        let that = this;
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_case_getCasecropIdJson.action',
            data    : {caseId:sourceId},
            success : function(result){
                var json = eval("("+result+")");
                that.props.handleCorpInfo(json.cropId,json.cropName)
                that.setState({
                    cropId: json.cropId,
                    cropName:json.cropName,
                })
            },
            error   : function(){
                that.setState({
                    cropId: "",
                    cropName:"",
                })
            }
        });
    }

    loadExpendPercentList(caseId){
        var that = this
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_workflow_loadExpendPercentJson.action',
            data    : {caseId:caseId},
            success : function(result){
                var json = eval("("+result+")");
                if(json.success){
                    var lists = json.lists;
                    var corpJoinAssign = json.corpJoinAssign;
                    var isAuto = json.isAuto;
                    that.props.loadExpendPercentList(lists,isAuto,corpJoinAssign,json.cropId,json.cropName);
                    that.setState({
                        cropId: json.cropId,
                        cropName:json.cropName,
                    })
                }else{
                    that.props.noExpendPercentListShow()
                }
            }
        })
    }

    preprocessingExpectMoneyList(caseId){
        var that = this;
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_finance_expectMoney_getExpectMoneyListJsonDataBill.action',
            data    : {caseId:caseId},
            success : function(result){
                var json = eval("("+result+")");
                var alreadyBill = json.alreadyBill;//已开票
                alreadyBill = addStatus(alreadyBill,0);

                var backBill = json.backBill;//开票被退回
                backBill = addStatus(backBill,1);

                var billing = json.billing;//开票申请中
                billing = addStatus(billing,2);

                // var redBilling = json.redBilling;//冲红/作废再开中
                // redBilling = addStatus(redBilling,3)

                var reding = json.reding;//冲红/作废申请中
                reding = addStatus(reding,4);

                var backRed = json.backRed;//冲红/作废被退回
                backRed = addStatus(backRed,5);

                var listLength = alreadyBill.length+backBill.length+billing.length+reding.length+backRed.length
                // if(listLength*1>0){
                    that.props.hideExpectMoneyDiv(concat_(alreadyBill,backBill,billing,reding,backRed))
                // }
            }
        })
    }



    loadExpectMoneyList(caseId){
        var that = this
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_finance_expectMoney_getExpectMoneyListJsonDataNoBill.action',
            data    : {caseId:caseId},
            success : function(result){
                var json = eval("("+result+")");
                var lists = json.lists;
                if(lists!=null && lists.length>0){
                    lists.sort(this.sortExpectMoney)
                }
                that.props.loadExpectMoneyList(lists)
            }
        })
    }

    sortExpectMoney(a, b){
        if(b==null||b=='')
            return 1
        else if(a==null||b=='')
            return -1
        var aDate = new Date(a.planCollectTime)
        var bDate = new Date(b.planCollectTime)
        return aDate.getTime()-bDate.getTime()
    }

    preprocessingInvoiceInfoReSend(caseId){
        // 隐藏极速开票按钮
        this.hideJskpBtn(caseId);
        let that = this;
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_case_getCaseClientJson.action',
            data    : {caseId:caseId},
            success : function(result){
                var json = eval("("+result+")");
                var lists = json.lists;
                var isBillTitleDoc = json.isBillTitleDoc;
                var clientArray=[];
                if(lists!=null && lists.length>0){
                    for(var i=0;i<lists.length;i++){
                        var obj = lists[i];
                        clientArray[i] = obj;
                    }
                }
                that.setState({
                    clientArray: clientArray,
                    isBillTitleDoc:isBillTitleDoc
                });
            },
            error   : function(){
                KinglexAlert.alert("发送请求失败");
            }
        });
    }

    preprocessingInvoiceInfo(caseId){
        // 清空发票抬头与纳税人信息
        this.setState({
            payMoneyPerson:"",
            newCompanyName:"",
            newIndivName:"",
            custNo:"",
            custType:"",
            titleType:1,
            org_address:"",
            org_tel:"",
            org_taxNo:"",
            org_bank:"",
            org_bankaccount:"",
            jskpCode:"",
            payMoneyPersonDiv:true,
            newCompanyNameDiv:false,
            newIndivNameDiv:false,
        })
        // 隐藏极速开票按钮
        this.hideJskpBtn(caseId);

        // 加载委托人
        this.loadCaseClient(caseId);

    }

    loadCaseClient(caseId){
        let that = this;
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_case_getCaseClientJson.action',
            data    : {caseId:caseId},
            success : function(result){
                var json = eval("("+result+")");
                var lists = json.lists;
                var isBillTitleDoc = json.isBillTitleDoc;
                var clientArray=[];
                if(lists!=null && lists.length>0){
                    for(var i=0;i<lists.length;i++){
                        var obj = lists[i];
                        clientArray[i] = obj;
                    }
                    if(lists.length==1){//一个默认选中
                        that.selectTitle(clientArray[0].clientid,clientArray[0].clientidtype,clientArray[0].clientName)
                    }
                }
                that.setState({
                    clientArray: clientArray,
                    isBillTitleDoc:isBillTitleDoc
                });
            },
            error   : function(){
                KinglexAlert.alert("发送请求失败");
            }
        });
    }

    openPayMoneyPerson(){
        this.setState({
            showPerson:!this.state.showPerson
        })
    }

    // 选择发票抬头
    selectTitle(id,type,name){
        var billType = this.state.billType
        if(billType==3||billType==5){ // 增值税发票
            this.showTipFunction(false)
            if(type=="2"){ // 个人客户
                KinglexAlert.alert('个人客户不能开增值税专用发票！');
                return;
            }
        }
        if(type=="2"){
            this.showTipFunction(false)
            this.disableTaxInfo(true);
        }else{
            if(billType!=3 && billType!=5){
                this.showTipFunction(true)
            }
            this.disableTaxInfoGov(this.state.isGov);
        }
        var custName = name;
        var custNo = id;
        var custType = type;
        this.setState({
            payMoneyPerson:custName,
            custNo:custNo,
            custType:custType,
            titleIsDiffDiv:false,
            showPerson:false,
        })
        // 获取纳税信息
        this.loadTaxInfo(custType,custNo);
    }

    loadTaxInfo(custType,custNo){
        let that=this
        // 清空纳税信息
        this.setState({
            org_address:"",
            org_tel:"",
            org_taxNo:"",
            org_bank:"",
            org_bankaccount:"",
            jskpCode:"",
        })
        var custType = custType
        var custNo =custNo;
        var titleType = this.state.titleType;

        if(custType=="1" && titleType=="1"){
            if(custNo!="" && custNo!="null"){
                $.ajax({
                    type    : 'post',
                    url     : 'organ_loadDetail.action',
                    data    : {ids:custNo},
                    success : function(responseText){
                        var result = eval("("+responseText+")");
                        if(result.success==true){
                            var items = result.items;
                            if(items.length>0){
                                var organ = items[0];
                                var taxs = organ.cstTaxOrganizations;
                                var address = "";
                                var tel = "";
                                var taxNo = "";
                                var bank = "";
                                var bankAccount = "";
                                var kpCode = "";
                                if(taxs.length>0){
                                    var obj = taxs[0];
                                    taxNo = obj.taxOrganTaxNo;	// 纳税人识别号
                                    bank = obj.taxOrganBankOne;	// 开户行
                                    bankAccount = obj.taxOrganBankAccountIdOne;	// 开户账号
                                    address = obj.taxOrganAddress; // 地址
                                    tel = obj.taxOrganPhone; // 电话
                                    kpCode = obj.taxOrganBillCode; // 开票代码
                                }

                                that.setState({
                                    org_address:address,
                                    org_tel:tel,
                                    org_taxNo:taxNo,
                                    org_bank:bank,
                                    org_bankaccount:bankAccount,
                                    jskpCode:kpCode,
                                })

                                // 判断是否显示极速开票按钮
                                that.checkJskpBtn(address,tel,taxNo,bank,bankAccount,custType);
                            }
                        }
                    },
                    error   : function(){
                        console.log("发送请求失败");
                    }
                });
            }
        }
    }

    checkJskp(caseId){
        var that = this
        var caseid =caseId
        if(caseid!=""){
            $.ajax({
                type    : 'post',
                url     : 'lawyerCenter_case_getCaseCorpFinanceJson.action',
                data    : {caseId:caseid},
                success : function(result){
                    var json = eval("("+result+")");
                    if(json.success){
                        $(".jskp_btn_area i").attr("class","ykt").html("已开通");
                    }else{
                        $(".jskp_btn_area i").attr("class","tj").html("NEW");
                    }
                    let goodsNameList = [];
                    if(null!=json.goodsCodeName){
                        goodsNameList = json.goodsCodeName.split(/[,，]+/);
                    }
                    if(json.mode!=undefined && json.mode!=null && json.mode==2){
                        that.props.changeMode(true,goodsNameList)
                    }else{
                        that.props.changeMode(false,[])
                    }
                },
                error   : function(){
                    console.log("发送请求失败");
                }
            });
        }
    }

    showJskpBtn(caseId){
        var caseid = caseId!=null?caseId:this.state.caseId;
        // $("#org_taxNo").css("width","251px");
        // $("#org_taxNo").parent().css("width","250px");
        // $("#org_taxNo").next().hide();
        // $(".jskp_btn_area").show();

        // 判断是否开通极速开票
        this.checkJskp(caseid);
    }

    hideJskpBtn(caseId){
        this.showJskpBtn(caseId);
    }

    checkJskpBtn(org_address,org_tel,org_taxNo,org_bank,org_bankaccount,custType){
        var billType = this.state.billType;
        if(billType!=null){

            var taxNo =org_taxNo
            var tel = org_tel
            var address = org_address
            var bank =org_bank
            var bankAccount = org_bankaccount

            var titleType = this.state.titleType
            var custType = custType

            if(titleType=="1"){
                if(custType=="1"){ // 单位客户
                    if(billType=="2"||billType=="4"){ // 普票
                        if(taxNo!=""){
                            this.hideJskpBtn();
                        }else{
                            this.showJskpBtn();
                        }
                    }else{ // 专票
                        if(address!="" && tel!="" && taxNo!="" && bank!="" && bankAccount!=""){
                            this.hideJskpBtn();
                        }else{
                            this.showJskpBtn();
                        }
                    }
                }else{
                    this.hideJskpBtn();
                }
            }else if(titleType=="3"){ // 新发票抬头
                if(this.state.newCompanyName!=""){	// 发票抬头为另一公司名称
                    this.showJskpBtn();
                }else{
                    this.hideJskpBtn();
                }
            }
        }else{
            this.hideJskpBtn();
        }
    }

    anotherTitle(e) {
        let billType= this.state.billType;
        var type=e.target.value;
        var newCompanyNameDiv = "";
        var newCompanyName = "";
        var newIndivNameDiv = false;
        var newIndivName = "";
        if((billType==3||billType==5) && type==2){
            this.showTipFunction(false)
            KinglexAlert.alert('个人客户不能开增值税专用发票！');
            return;
        }
        if(type==1){
            this.showTipFunction(billType!=3&&billType!=5)
            this.disableTaxInfoGov(this.state.isGov);
            newCompanyNameDiv=true
        }else{
            this.showTipFunction(false)
            this.disableTaxInfo(true);
            newIndivNameDiv=true
        }
        this.setState({
            org_taxNo:"",
            org_tel:"",
            org_address:"",
            org_bank:"",
            org_bankaccount:"",
            showPerson:false,
            payMoneyPersonDiv:false,
            custType:type,
            titleType:3,
            newCompanyName:newCompanyName,
            newIndivName:newIndivName,
            newCompanyNameDiv:newCompanyNameDiv,
            newIndivNameDiv:newIndivNameDiv,
        })

        if(type==1){ // 发票抬头为另一公司名称
            setTimeout(function () {
                $("#newCompanyName").focus();
            }, 0);
        }else if(type==2){ // 发票抬头使用其他个人
            setTimeout(function () {
                $("#newIndivName").focus();
            }, 0);
        }
    }
    handleClientMouseLeave(e){
        let id=e.target.name;
        let value = e.target.value;
        if(id=="newIndivName"){this.setState({newIndivName:value,})}
        if(id=="newCompanyName"){this.setState({newCompanyName:value,})}
        if(value==""){
            this.setState({
                custType:"",
                payMoneyPerson:"",
                payMoneyPersonDiv:true,
                titleType:1,
                newCompanyNameDiv:false,
                newIndivNameDiv:false,
            })
            this.loadCaseClient(this.state.caseId);
        }else{
            var isShow = true
            var name = value;
            for(var i=0;i<this.state.clientArray.length;i++){
                if(name==this.state.clientArray[i].clientName){
                    isShow=false
                    break
                }
            }
            this.setState({
                titleIsDiffDiv:isShow
            })
        }
    }
    handleClientChange(e) {
        let id=e.target.name;
        let value = e.target.value;
        if(id=="newIndivName"){this.setState({newIndivName:value,})}
        if(id=="newCompanyName"){this.setState({newCompanyName:value,})}
    }

    handleTaxChange(id,value){
        if(id=="org_taxNo"){this.setState({org_taxNo:value,})}
        if(id=="org_tel"){this.setState({org_tel:value,})}
        if(id=="org_address"){this.setState({org_address:value,})}
        if(id=="org_bank"){this.setState({org_bank:value,})}
        if(id=="org_bankaccount"){this.setState({org_bankaccount:value,})}
        if(id=="coustomerPhone"){this.setState({coustomerPhone:value,})}
        if(id=="coustromerEmail"){this.setState({coustromerEmail:value,})}
    }

    // isSend() {
    //     this.setState({
    //         isCoustomer:!this.state.isCoustomer
    //     })
    // }

    showDocMoreKeyDown(event){
        if(event.keyCode==13){
            this.showDocMore(0);
            return false;
        }
    }
    removeFile(file){
        this.state.webuploader.removeFile(file,true);
    }

    existDocument(){
        this.setState({
            existDocumentDiv:true,
        })
        // 默认查询
        this.showDocMore(this.state.index);

        // //回车查询
        // $("input[name='filename']").off('keydown').on("keydown",function(event){
        //     if(event.keyCode==13){
        //         eventHub.emit('existDocumentKeydown', null, null);
        //         // this.showDocMore(0);
        //         return false;
        //     }
        // });

        //美化浏览器的滚动条
        $(".journal_related_list").niceScroll({
            touchbehavior:false,cursorcolor:"#e5e5e5",cursoropacitymax:1,cursorwidth:4,horizrailenabled:true,cursorborderradius:5,autohidemode:true,background:'none',cursorborder:'solid 1px #c2c2c2'
        });
    }

    showDocMore20(){
        var index = this.state.index+20
        this.showDocMore(index)
    }

    //加载更多文档
    showDocMore(index){
        if(index==null){
            index=1;
        }
        let that  = this
        var querytext = $("#existDocument").find("input[name='filename']").val();
        // 业务文档项目是否为空
        var sourceId = this.state.caseId;
        var sourceType =this.state.caseType;
        var existDocumentDiv = this.state.existDocumentDiv
        if((sourceId==null || sourceId=="") && existDocumentDiv){
            KinglexAlert.tip("请先选择项目");
            this.setState({
                existDocumentDiv:false,
            })
            return;
        }
        var data={
            sourceId   : sourceId,
            sourceType : sourceType,
            index      : index,
            querytext  : querytext,
            docStatus  : 0	//0.已创建
        }
        var mask=new KinglexLoadMask();
        mask.show();
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_document_chooseMyDocList2.action',
            data    : data,
            success : function(result){
                mask.hide();
                that.generateDocHtml(index,result);
            },
            error   : function(){
                mask.hide();
                KinglexAlert.alert("发送请求失败");
            }
        });
    }
    // 构建文档页面
    generateDocHtml(index,result){
        var json = eval("("+result+")");
        var lists = json.lists;
        let doc = [];
        if(lists.length>0){
            if(index==0){
                doc = lists;
            }else{
                let doc__ = this.state.doc;
                for(var i=0;i<lists.length;i++){
                    var obj = lists[i];
                    doc__[doc__.length] = obj
                }
                doc = doc__;
            }
        }
        this.setState({
            doc:doc,
            length:lists.length
        })
        // 已选择文档标记
        $("#billDocList").find(".workflow_doc").find("input[name='bill_docId']").each(function (){
            $(".journal_related_line[data-id='"+$(this).val()+"']").find(".Green_img").show();
            $(".journal_related_line[data-id='"+$(this).val()+"']").find("p").removeProp("onclick");
        });
    }

    handleSelectDoc(docId,filename,size,ext){
        this.completeUpdDoc(docId,filename,size,ext)
        this.setState({
            existDocumentDiv:false,
        })
    }

    uploadInit(){
        let that = this
        var sourceId = $("#caseId").val();
        if(sourceId==null || sourceId==""){
            KinglexAlert.tip("请先选择项目");
            return ;
        }
        var docNum = $("#billDocList").find(".workflow_doc").size();
        $("#toCreateDocShowDiv").show();
        $("#p_id").show();
        var uploadLimit = 1-docNum;//上传文件的数量
        var maxFileSize = 100; // 最大上传100M
        var uploader = WebUploader.create({
            auto     : false,
            swf      : 'lawyercenter/webuploader/Uploader.swf',
            server   : 'lawyerCenter_documentUpload_upload.action',
            timeout  : 30 * 60 * 1000,    // 30分钟
            pick     : {
                id        : '#file_upload',
                innerHTML : '+ 选择文档',
            },
            accept   : {extensions:'doc,docx,wps,odt,rtf,xls,xlsx,et,ods,csv,ppt,pptx,dps,odp,pdf,txt,jpg,jpeg,gif,png,bmp,tif,mp3,m4a,mid,midi,wma,zip,rar,tar,7z'},
            fileNumLimit : uploadLimit,
            paste 	 : '#docAlertWork',	// 截图粘贴
            dnd 	 : '#docAlertWork',	// 拖动
            disableGlobalDnd:true		// 启动拖动

        });

        // 当有文件被添加进队列的时候
        uploader.on('fileQueued',function(file){
            $("#p_id").hide()
            if(file.size>(maxFileSize*1024*1024)){
                alert("文件大小超出限制，只能上传"+maxFileSize+"M以内的文件。");
                return false;
            }
            var listHtml = '';
            listHtml += '<div id="'+file.id+'" class="webuploader-queue-item">';
            listHtml += '	<div class="webuploader-queue-item-fileName">'+file.name+'('+fileSize(file.size)+')</div>';
            listHtml += '	<div class="webuploader-queue-item-progress">';
            listHtml += '		<div class="webuploader-queue-item-progress-bar"></div>';
            listHtml += '	</div>';
            listHtml += '	<div class="webuploader-queue-item-progress-txt"></div>';
            listHtml += '	<div class="webuploader-queue-item-error"></div>';
            listHtml += '	<div class="webuploader-queue-item-cancel">';
            listHtml += '		<a href="javascript:removeFile(\''+file.id+'\')">X</a>';
            listHtml += '	</div>';
            listHtml += '</div>';
            $("#fileQueue").append(listHtml);
        });

        // 当文件被移除队列后
        uploader.on('fileDequeued', function(file) {
            $("#"+file.id).remove();
        });

        // 上传过程中触发，携带上传进度
        uploader.on('uploadProgress', function(file, percentage) {
            var percentage = Math.round(percentage*100)+'%';
            $("#"+file.id).find(".webuploader-queue-item-progress-bar").css('width', percentage);
            $("#"+file.id).find(".webuploader-queue-item-progress-txt").html(percentage);
        });

        // 当文件上传出错时触发
        uploader.on('uploadError', function(file,code) {
            $('#'+file.id).find('.webuploader-queue-item-error').html('上传出错');
            console.log(code);
        });

        uploader.on( 'error', function( code,file ) {
            switch(code){
                case 'Q_EXCEED_NUM_LIMIT':
                    alert("文件数量超出限制，一次只能上传个"+uploadLimit+"文件");
                    break;
                case 'Q_TYPE_DENIED':
                    if(file.size==0){
                        alert("请勿上传0kb的文档");
                    }else{
                        alert("选择的文件类型不支持上传");
                    }
                    break;
            }
        });

        uploader.on('uploadBeforeSend', function (obj, data, headers) {
            // 传值
            var folderId = $("#upload_folderId").val();
            var sourceId = $("#caseId").val();
            var sourceType = $("#caseType").val();
            var docType = 58;

            data.folderId = folderId;
            data.sourceId = sourceId;
            data.sourceType = sourceType;
            data.docType = docType;
        });

        // 当文件上传成功时触发
        uploader.on('uploadSuccess', function(file,json) {
            if(null==json || null==json.success){
                alert("文档异常");
                return;
            }
            if(json.success){
                $("#toCreateDocShowDiv").hide();

                that.completeUpdDoc(json.docId,file.name,file.size,file.ext);
            }else{
                alert("上传失败");
            }
        });

        // 当所有文件上传结束时触发
        uploader.on('uploadFinished', function(){
            that.closeUpdFile();
        });

        // 开始上传
        $("#startUploadBtn").unbind('click').click(function(){
            var count = uploader.getFiles().length;
            if(count==0){
                alert("请选择文档后再上传");
                return;
            }

            var btnTxt = $(this).val();
            if(btnTxt=="开始上传"){
                var bool = false;
                $(".webuploader-queue-item-docType").each(function(index){
                    var docType = $(this).find("span").attr("data-value");
                    if(docType==""){
                        bool = true;
                        return false;
                    }
                });
                if(bool){
                    alert("请选择对应文档的文档类型后再上传");
                }else{
                    $(this).val("上传中...")
                    uploader.upload();
                }
            }
        })
        that.setState({
            webuploader: uploader
        })

        $("#toCreateDocShowDiv").find(".finance_close").unbind("click").click(function(){
            that.closeUpdFile();
        })
    }

    completeUpdDoc(docId,fileName,size,ext) {
        var imgSrc="lawyercenter/images/ico/small_"+getIco(ext)+".png";
        var fileSize_ = fileSize(size);
        var fileSrc = "lawyerCenter_document_onlineShow.action?ids="+docId
        this.setState({
            docId:docId,
            fileImg:imgSrc,
            fileSize:fileSize_,
            fileName:fileName,
            fileSrc:fileSrc,
        })
    }

    removeDoc(){
        this.setState({
            docId:"",
            fileImg:"",
            fileSize:"",
            fileName:"",
            fileSrc:"",
        })
    }

    closeUpdFile(){
        this.state.webuploader.reset();
        this.state.webuploader.destroy();
        $("#fileQueue").html("");
        $("#fileQueue").html("<p id=\"p_id\" style=\"text-align: center;font-size: 16px;margin-top: 83px;\">可将文件拖到这里</p>");
        $("#startUploadBtn").val("开始上传");
        $("#toCreateDocShowDiv").hide();
    }

    initOhterData(json){
        this.setState({
            caseId:json.sourceId,
            caseType:1,
            caseName:json.sourceName,
            type:1,
        })

        this.loadCorpId(json.sourceId);

        // 预处理发票信息
        this.preprocessingInvoiceInfo(json.sourceId);

        // 加载分配比例
        this.loadExpendPercentList(json.sourceId);
    }

    validatorData(){
        var billType = this.state.billType;
        if(billType==""){
            KinglexAlert.alert("发票类型不能为空")
            return false;
        }
        var caseId = this.state.caseId;
        if(caseId==""){
            KinglexAlert.alert("发票关联项目不能为空")
            return false
        }
        var billTitle = this.state.newIndivName!=""?this.state.newIndivName:(this.state.newCompanyName!=""?this.state.newCompanyName:this.state.payMoneyPerson)
        if(billTitle==""){
            KinglexAlert.alert("发票抬头不能为空")
            return false
        }


        if(this.state.isBillTitleDoc && this.state.titleIsDiffDiv && this.state.docId==""){
            KinglexAlert.alert("发票抬头说明不能为空，请选择说明文档")
            return false
        }

        if(!this.state.disableTax && this.state.org_taxNo==""){
            KinglexAlert.alert('请填写纳税人识别号！',function(){
                $("#org_taxNo").focus();
            });
            return false;
        }
        if(billType==3 || billType==5){
            if(!this.state.disableTax && this.state.org_tel==""){
                KinglexAlert.alert('请填写电话！',function(){
                    $("#org_tel").focus();
                });
                return false
            }

            if(!this.state.disableTax && this.state.org_address==""){
                KinglexAlert.alert('请填写地址！',function(){
                    $("#org_address").focus();
                });
                return false
            }

            if(!this.state.disableTax && this.state.org_bank==""){
                KinglexAlert.alert('请填写开户行！',function(){
                    $("#org_bank").focus();
                });
                return false
            }

            if(!this.state.disableTax && this.state.org_bankaccount==""){
                KinglexAlert.alert('请填写银行账号！',function(){
                    $("#org_bankaccount").focus();
                });
                return false
            }
        }
        if((billType==4 || billType==5) && this.state.isCoustomer && this.state.coustomerPhone==""){
            KinglexAlert.alert('请填写联系人手机号！',function(){
                $("#coustomerPhone").focus();
            });
            return false
        }
        var telReg = /(^(\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})$|^(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;																			;
        if((billType==4 || billType==5) && this.state.isCoustomer && this.state.coustomerPhone!="" && !telReg.test(this.state.coustomerPhone)){
            KinglexAlert.alert('请输入正确的手机号码！',function(){
                $("#coustomerPhone").focus();
            });
            return false
        }

        if((billType==4 || billType==5) && this.state.isCoustomer && this.state.coustromerEmail==""){
            KinglexAlert.alert('请填写联系人邮箱地址！',function(){
                $("#coustromerEmail").focus();
            });
            return false
        }
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if((billType==4 || billType==5) && this.state.isCoustomer && this.state.coustromerEmail!="" && !emailReg.test(this.state.coustromerEmail)){
            KinglexAlert.alert('请输入正确的邮箱地址！',function(){
                $("#coustromerEmail").focus();
            });
            return false
        }
        this.props.submitData(this.state);
        return true;
    }
    deleteComponent(){
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }

    componentDidMount() {
        var that = this;
        var id=new Date().getTime() + Math.random()
        eventHub.on('validatorData',id, this.validatorData);
        eventHub.on('validatorDataRedToOther',id, this.validatorData);
        eventHub.on('defaultCaseId',id, this.preSelectCaseCallBack);
        eventHub.on('loadCaseAndPercent',id, this.initOhterData);
        eventHub.on('loadHideMoneyList',id, this.loadHideMoneyList);
        eventHub.on('removeFile',id,  this.removeFile);
        eventHub.on('componentWillUnmount',id, this.deleteComponent);
        eventHub.on('judageBillType',id, this.judageBillType);
        $.ajax({
            url:"lawyerCenter_financeBill_getBillType.action",
            type:"post",
            success:function(result){
                var json = eval("("+result+")");
                if(json.success){
                    var isCoustomer = json.notifyFlag==1?true:false;
                    var billTypeinfo=[];
                    if(json.np!=1 && json.ne==1){//没开通纸质普票 但开通了电子普票
                        var ne = { value: 4, title: "普通（电子发票）", active: 0 ,img:"lawyercenter/images/electronicVATOrdinaryInvoice.png"}
                        billTypeinfo.push(ne)
                        if(json.sp==1){
                            var sp = { value: 3, title: "专用（纸质发票）", active: 0 ,img:"lawyercenter/images/title_bg_d.png"}
                            billTypeinfo.push(sp)
                        }
                        if(json.se==1){
                            var se = { value: 5, title: "专用（电子发票）", active: 0 ,img:"lawyercenter/images/electronicVATSpecialInvoice.png"}
                            billTypeinfo.push(se)
                        }
                    }else{//其他情况
                        if(json.np==1){
                            var np =  { value: 2, title: "普通（纸质发票）", active: 0 ,img:"lawyercenter/images/title_bg_a.png"}
                            billTypeinfo.push(np)
                        }
                        if(json.sp==1){
                            var sp = { value: 3, title: "专用（纸质发票）", active: 0 ,img:"lawyercenter/images/title_bg_d.png"}
                            billTypeinfo.push(sp)
                        }
                        if(json.ne==1){
                            var ne = { value: 4, title: "普通（电子发票）", active: 0 ,img:"lawyercenter/images/electronicVATOrdinaryInvoice.png"}
                            billTypeinfo.push(ne)
                        }
                        if(json.se==1){
                            var se = { value: 5, title: "专用（电子发票）", active: 0 ,img:"lawyercenter/images/electronicVATSpecialInvoice.png"}
                            billTypeinfo.push(se)
                        }
                    }
                    var value = null;
                    if(billTypeinfo.length>0){
                        billTypeinfo[0].active=1;
                        value = billTypeinfo[0].value;
                        let billTypeimg = billTypeinfo[0].img
                        that.props.onBillTypeImg(billTypeimg)

                    }
                    that.setState({
                        billType:value,
                        isCoustomer:isCoustomer,
                        billTypeinfo:billTypeinfo,
                    })
                }
            },
            error:function(){
                console.log("发送请求失败")
            }
        })
        this.setState({
            id:id,
        })
    }

    componentWillUnmount() {
        var id = this.state.id;
        eventHub.remove("validatorData",id);
        eventHub.remove("validatorDataRedToOther",id);
        eventHub.remove("defaultCaseId",id);
        eventHub.remove("loadCaseAndPercent",id);
        eventHub.remove('loadHideMoneyList',id);
        eventHub.remove('removeFile',id);
        eventHub.remove('componentWillUnmount',id);
        eventHub.remove('judageBillType',id);
    }

    render() {
        var manageType = $("#applyForInvoiceForm").find("#manageType").val();
        return (
            <div id="tableConter" className="invoice_table clear">
                <input type="hidden" id="custNo" name="custNo" value={this.state.custNo}/>
                <input type="hidden" id="custType" name="custType"value={this.state.custType}/>
                <input type="hidden" id="titleType" name="titleType" value={this.state.titleType}/>
                <div className="right_table billinfo_width820 fl">
                    <div className="right_top billinfo_top clear">
                        <div className="billinfo_div">
                            <span className="desc billinfo_des dis_in_block fl"><em>*</em>申请发票类型</span>
                            {this.state.billTypeinfo.map((billTypeObj) =>
                                <BillTypeRadio key={billTypeObj.value} value={billTypeObj.value}  active={billTypeObj.active} title={billTypeObj.title} onValueClick={this.handleValueClick}></BillTypeRadio>
                            )}
                        </div>
                        <div className="billinfo_div" style={{marginBottom:"10px"}}>
                            <span className="desc billinfo_des  dis_in_block fl"><em>*</em>项目，发票抬头</span>
                            <div className="fl">
                                <input type="hidden" name="cropId" value={this.state.cropId}/>
                                <input type="hidden" name="cropName" value={this.state.cropName}/>
                                <input type="hidden" id="caseId" name="caseId" value={this.state.caseId}/>
                                <input type="hidden" id="caseName" name="caseName" value={this.state.caseName}/>
                                <input type="hidden" id="caseType" name="caseType" value={this.state.caseType}/>
                                {this.state.type==0?
                                    <div id="selector_case" className="billinfo_select select_mod selector_case dis_in_block none_border overtext select_arrows" onClick={this.getCaseInfoViewReact} manageType={manageType} data-onlytype={1} style={{paddingRight: "0px"}}>
                                        <div id="click_Select_Lower" className="case_click_Select_Lower_css">
                                            <i>+</i>
                                            <font>请选择项目</font>
                                        </div>
                                    </div>
                                    :
                                    <span className="billinfo_select select_mod dis_in_block none_border overtext fl" title={this.state.caseName}>{this.state.caseName}</span>
                                }
                            </div>
                            {/*{this.state.payMoneyPersonDiv?*/}
                                <div id="payMoneyPersonDiv" className="financeAlert_div_left_smal_list_react fl" style={{display:(this.state.payMoneyPersonDiv?"block":"none")}}>
                                    <input autoComplete="off" type="text" id="payMoneyPerson" onClick={this.openPayMoneyPerson} style={{paddingRight: "20px",width: "180px",cursor: "pointer"}} name="payMoneyPerson" readOnly="readOnly" className="billinfo_select select_mod dis_in_block arrow_down overtext" placeholder="请选择发票抬头" value={this.state.payMoneyPerson} title={this.state.payMoneyPerson}/>
                                    {this.state.showPerson?
                                        <ul id="selector_title" className="financeAlert_div_left_smal_list_ul" style={{width:"320px",top:"33px",display:"block"}} >
                                            {this.state.clientArray.length>0?(
                                                this.state.clientArray.map((obj) =>
                                                    <BillTypePerson  key={obj.clientid} clientid={obj.clientid} clienttype={obj.clientidtype} className="overtext" clientname={obj.clientName} selectTitle={this.selectTitle}>{obj.clientName}</BillTypePerson>
                                                )
                                            ):null}
                                            <li className="another_title" onClick={this.anotherTitle} value="1">发票抬头为另一公司名称</li>
                                            <li className="another_title" onClick={this.anotherTitle} value="2">发票抬头使用其他个人</li>
                                        </ul>
                                         :null}
                                </div>
                                 {/*:null}*/}
                            {this.state.newCompanyNameDiv ? (
                                <input autoComplete="off" onBlur={this.handleClientMouseLeave} style={{    cursor: "pointer"}} type="text" id="newCompanyName" name="newCompanyName" className="billinfo_select select_mod dis_in_block fl overtext" placeholder="请输入正确的发票抬头" value={this.state.newCompanyName} title={this.state.newCompanyName} onChange={this.handleClientChange}/>
                            ) : null}
                            {this.state.newIndivNameDiv ? (
                                <input autoComplete="off" onBlur={this.handleClientMouseLeave} style={{    cursor: "pointer"}} type="text" id="newIndivName" name="newIndivName" className="billinfo_select select_mod dis_in_block fl overtext" placeholder="请输入正确的发票抬头" value={this.state.newIndivName} title={this.state.newIndivName} onChange={this.handleClientChange} />
                            ) : null}
                        </div>
                        {this.state.titleIsDiffDiv?(
                            <div id="titleIsDiffDiv">
                                <span className="desc billinfo_des dis_in_block fl"><em>{this.state.isBillTitleDoc?"*":""}</em>发票抬头说明</span>
                                {this.state.docId==""?
                                    <div id="billTitleText">
                                        <label style={{marginLeft: "0px"}} className="check_label dis_in_block fl">您的发票抬头与委托人不一致，律所要求提交说明</label>
                                        <label className="check_label dis_in_block fl"><a href="#" onClick={this.uploadInit} className="billinfo_uploadDoc cjhta01"><img className="billinfo_img" src="lawyercenter/images/upload.png"/>上传说明文件</a></label>
                                        <label className="check_label dis_in_block fl"><a href="#" onClick={this.existDocument} className="billinfo_uploadDoc cjhta01"><img className="billinfo_img" src="lawyercenter/images/exist.png"/>选择已有文档</a></label>
                                    </div>
                                    :
                                    <div id="billDocList" className="workflow_doc_list fl" style={{marginLeft: "0px", width: "670px"}}>
                                        <div className="workflow_doc">
                                            <input seletype="uploadDoc" name="bill_docId" type="hidden" value={this.state.docId}/>
                                            <p className="doc_name_abbreviation">
                                                <img className="doc_related_img" style={{margin: "3px 10px 3px 0px"}} src={this.state.fileImg}/>
                                                <a href={this.state.fileSrc} target="_blank" style={{lineHeight: "34px"}}>{this.state.fileName}({this.state.fileSize})</a>
                                                <span className="operate"><a href="#" onClick={this.removeDoc}>移除</a></span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                <div id="billDocList" className="workflow_doc_list fl" style={{marginLeft:"0px",width:"670px"}}></div>
                            </div>
                        ):null}
                    </div>
                    <div className="right_top billinfo_top clear" style={{borderBottom: "none"}}>
                        <div className="billinfo_div billinfo_select_w" style={{marginTop: "10px",marginBottom: "10px"}}>
                            <span className="desc billinfo_des dis_in_block fl"><em>*</em>纳税人识别号</span>
                            <div className="input_wrap billinfo_select fl" style={{    borderRight: "none"}}>
                                <BillInputReact disabled={this.state.disableTax} style={{width: "301px !important",background: this.state.disableTax?"rgb(242, 242, 242)":""}} class="billinfo_select input_text" name="org_taxNo"  placeholder="请输入纳税人识别号/统一社会信用代码" value={this.state.org_taxNo} onValueChange={this.handleTaxChange}/>
                            </div>
                            <div className="jskp_btn_area" style={{display:"block"}} onClick={this.speedBill}>
                                <span style={{marginLeft:"21px"}}>调取开票信息</span>
                                <i className="tj">NEW</i>
                            </div>
                            <label className="check_label dis_in_block fl" style={{cursor:"pointer"}}><input type="checkbox" name="isGov" disabled={this.state.disableTax && !this.state.isGov} checked={this.state.isGov ? 'checked' : ''}  onClick={this.disableTaxInfoClick} readOnly/>政府/事业单位/外企，无纳税号</label>
                        </div>
                    {this.state.showTip?
                        <span className="desc billinfo_line_height billinfo_des dis_in_block fl" style={{width: "800px",paddingLeft: "150px"}}>您申请的是普票,如果客户要求发票上填写完整的开票信息，请点击
                            <span style={{color: "#ea7771",cursor:"pointer"}} onClick={this.showTax}>展开填写(电话、地址、银行账号)</span>
                        </span>
                        :
                        null
                    }
                    </div>
                    {this.state.billType==3 || this.state.billType==5 || (this.state.billType!=3 && this.state.billType!=5 && this.state.isShowTax)?
                        <div className="right_select_w" style={{display:"block"}}>
                            <div className="right_top clear">
                                <span className="desc billinfo_des dis_in_block fl">
                                    {this.state.billType==3||this.state.billType==5?
                                        <em>*</em>:null
                                    }
                                    电话、地址
                                </span>
                                <div className="input_wrap billinfo_width633 fl">
                                    <BillInputReact  disabled={this.state.disableTax} style={{background: this.state.disableTax?"rgb(242, 242, 242)":""}} class="input_phone billinfo_select fl" name="org_tel"  placeholder="电话" value={this.state.org_tel} onValueChange={this.handleTaxChange}/>
                                    <BillInputReact  disabled={this.state.disableTax} style={{background: this.state.disableTax?"rgb(242, 242, 242)":""}} class="input_desc billinfo_select_320 fl" name="org_address"  placeholder="地址" value={this.state.org_address} onValueChange={this.handleTaxChange}/>
                                </div>
                            </div>
                            <div className="right_top clear">
                                <span className="desc billinfo_des dis_in_block fl">
                                    {this.state.billType==3||this.state.billType==5?
                                        <em>*</em>:null
                                    }
                                    开户行及账号
                                </span>
                                <div className="input_wrap billinfo_width633 fl">
                                    <BillInputReact disabled={this.state.disableTax} style={{background: this.state.disableTax?"rgb(242, 242, 242)":""}} class="input_phone billinfo_select fl" name="org_bank"  placeholder="开户行" value={this.state.org_bank} onValueChange={this.handleTaxChange}/>
                                    <BillInputReact disabled={this.state.disableTax} style={{background: this.state.disableTax?"rgb(242, 242, 242)":""}} class="input_desc  billinfo_select_320 fl" name="org_bankaccount"  placeholder="银行账号" value={this.state.org_bankaccount} onValueChange={this.handleTaxChange}/>
                                </div>
                            </div>
                        </div>
                        :null}
                    {this.state.billType==4 || this.state.billType==5?(
                        <div className="billinfo_top clear" id="coustomerDiv" style={{borderTop: "#ccc solid 1px"}}>
                            <div className="billinfo_div">
                                <span className="desc billinfo_line_height billinfo_des dis_in_block fl" style={{width: "800px"}}>您申请的是电子发票，开票完成后将自动通知客户联系人</span>
                            </div>
                            <div className="billinfo_div" style={{marginBottom: "10px"}}>
                                <span className="desc billinfo_des dis_in_block fl" style={{    marginTop: "7px"}}>
                                    {this.state.isCoustomer?
                                        <em style={{    color: "#ea7771"}}>*</em>:null
                                    }
                                        自动通知客户
                                </span>
                                <div className="input_wrap billinfo_width633 billinfo_ fl">
                                    <BillInputReact disabled={false}  class="billinfo_input billinfo_select fl" name="coustomerPhone"  placeholder="联系人手机号" value={this.state.coustomerPhone} onValueChange={this.handleTaxChange}/>
                                    <BillInputReact disabled={false}  class="billinfo_select_320 billinfo_input_end billinfo_select fl" name="coustromerEmail"  placeholder="联系人邮箱地址" value={this.state.coustromerEmail} onValueChange={this.handleTaxChange}/>
                                </div>
                            </div>
                        </div>
                    ):null}
                </div>
                {this.state.existDocumentDiv?
                    <div id="existDocument" className="alert_div journal_related_alert" style={{height:"550px",display:"block"}}>
                        <div className="alert_h" style={{borderBottom:"0px"}}>选择已有文档<a className="alert_h_close" href="#" onClick={this.closeDocument}></a></div>
                        <div className="alert_c" style={{paddingLeft:"45px"}}>
                            <div className="journal_related_w clear">
                                <div className="journal_related_l" style={{width: "684px"}}>
                                    <div className="journal_related_h">
                                        <p className="journal_related_h_t">全部文档</p>
                                        <input autoComplete="off" className="journal_related_h_s overtext" name="filename" placeholder="输入文档名称搜索" type="text" onKeyDown={this.showDocMoreKeyDown}/>
                                    </div>
                                    <div className="journal_related_list" id="existDocList" style={{overflow:"overlay",height: "430px"}} tabIndex="2">
                                        {this.state.doc.map((obj) =>
                                            <BillTypeDoc key={obj.id} selectDoc={this.handleSelectDoc} docId={obj.id} filename={obj.filename} fileSize={obj.fileSize} ext={obj.ext}></BillTypeDoc>
                                        )}
                                        {this.state.length>=20?
                                            <div name="docToMorePageBtn" className="journal_related_line clear"
                                                 style={{textAlign:"center"}}>
                                                <a herf="#" onClick={this.showDocMore20}>加载更多</a>
                                            </div>
                                            :null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :null}
                <div id="toCreateDocShowDiv" className="docAlertWarp" style={{display: "none"}}>
                    <div className="docMakr"></div>
                    <div className="docAlert" >
                        <div className="billinfo_financeAlert_head" style={{marginRight: "50px"}}>
                            上传新文档
                            <a className="finance_close" href="#" ></a>
                        </div>
                        <div className="docAlert_center">
                            <input type="hidden" name="upload_folderId" id="upload_folderId" value="-1"/>
                            <input type="hidden" name="sourceId" id="upload_sourceId"/>
                            <input type="hidden" name="sourceType" id="upload_sourceType"/>
                            <input type="hidden" name="docType" id="upload_docType"/>
                            <p className="docAlert_text">
                                您即将上传以下文档：
                                <span id="file_upload" style={{display: "inline-block"}}></span>
                            </p>
                            <div id="docAlertWork" className="docWork">
                                <div id="fileQueue">
                                    <p id="p_id" style={{textAlign: "center",fontSize: "16px",marginTop: "83px"}}>可将文件拖到这里</p>
                                </div>
                            </div>
                        </div>
                        <div className="docAlert_line">
                            <input className="docAlert_line_btn" type="button" id="startUploadBtn" value="开始上传"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    speedBill() {
        var caseId = this.state.caseId;
        var that = this;
        if(caseId!=""){
            $.ajax({
                type    : 'post',
                url     : 'lawyerCenter_case_getCaseCorpFinanceJson.action',
                data    : {caseId:caseId},
                success : function(result){
                    var json = eval("("+result+")");
                    if(json.success){
                        var titleType = that.state.titleType;
                        var kpName = "";
                        if(titleType=="3"){
                            if(that.state.newCompanyNameDiv){
                                var newCompanyName = that.state.newCompanyName
                                if(newCompanyName==""){
                                    KinglexAlert.alert('请输入正确的发票抬头！');
                                    return;
                                }
                            }else if(that.state.newIndivNameDiv){
                                KinglexAlert.alert('个人客户不能一键调取开票信息');
                                return;
                            }
                            kpName = that.state.newCompanyName
                        }else{
                            if(that.state.payMoneyPerson==""){
                                KinglexAlert.alert('请选择发票抬头！');
                                $("#payMoneyPerson").focus();
                                return;
                            }
                            kpName = that.state.payMoneyPerson;
                        }
                        if(that.state.isKpNameArray.length>0 && that.state.isKpNameArray.indexOf(kpName)!=-1){
                            KinglexAlert.confim({title:"提示",content:"您已成功调取开票信息，确认需要再次调取吗？",ok:"确定",fn:function(btn){
                                    if(btn=="yes"){
                                        that.speedBillInfo(kpName);
                                    }
                                }});
                        }else{
                            that.speedBillInfo(kpName);
                        }
                    }else{
                        $("#notfind_jskp_alert").show();
                        $("#notfind_jskp_alert").find(".jskp_alert_close").unbind("click").click(function(){
                            if(ApplyForInvoice!=null){
                                ApplyForInvoice.stopCount();
                            }
                        })

                        // 倒计时开始
                        //timedCount();

                    }
                    let goodsNameList = [];
                    if(null!=json.goodsCodeName && json.goodsCodeName!=""){
                        goodsNameList = json.goodsCodeName.split(/[,，]+/);
                    }
                    if(json.mode!=undefined && json.mode!=null && json.mode==2){
                        that.props.changeMode(true,goodsNameList)
                    }else{
                        that.props.changeMode(false,[])
                    }
                },
                error   : function(){
                    console.log("发送请求失败");
                }
            });
        }
    }
    speedBillInfo(kpName){
        var that =this;
        var mask = new KinglexLoadMask();
        mask.show();
        var data ={
            payMoneyPerson:kpName,
            caseInfoId:this.state.caseId,
            custNo:this.state.custNo,
            custType:this.state.custType,
            titleType:this.state.titleType,
            isGov:this.state.isGov
        };
        $.ajax({
            type    : 'post',
            url     : 'lawyerCenter_financeBill_speedBillInfo.action',
            data    : data,
            success : function(result){
                mask.hide();
                var json = eval("("+result+")");
                if(json.success){
                    let isKpNameArray =that.state.isKpNameArray;
                    isKpNameArray.push(kpName);
                    KinglexAlert.tip("一键调取成功！");
                    var data = json.data;
                    var org_taxNo = data.kpCode;
                    var org_tel = data.kpTel;
                    var org_address = data.kpAddr;
                    var org_bank = data.accountBlank;
                    var org_bankaccount = data.bankAccount;

                    that.setState({
                        org_address:org_address,
                        org_tel:org_tel,
                        org_taxNo:org_taxNo,
                        org_bank:org_bank,
                        org_bankaccount:org_bankaccount,
                        isKpNameArray:isKpNameArray,
                    })
                }else{
                    if(null!=json.msg && ""!=json.msg){
                            KinglexAlert.alert(json.msg);
                    }else{
                        KinglexAlert.alert("获取纳税信息失败！");
                    }
                }
            },
            error   : function(){
                mask.hide();
                KinglexAlert.alert("发送请求失败");
            }
        });
    }
    // stopCount(){
    //     clearTimeout(this.state.t);
    //     $(".jskp_djs_alert_text i").html(this.state.s);
    //     $("#notfind_jskp_alert").hide();
    //     this.setState({
    //         c:0,
    //         t:0,
    //     })
    // }

    closeDocument() {
        this.setState({
            existDocumentDiv:false,
        })
    }
}

function fileSize(val){
    var temp = Math.round(val/1024);
    if(temp<=0){
        temp = Math.round(val/32) + "byte";
    }
    if(temp>0 && temp<1024){
        temp = temp + "KB";
    }
    if(temp>1024){
        temp = Math.round(temp/1024) + "M";
    }
    return temp;
}

/** 获取图标 **/
function getIco(sufix){
    var ico = "default"; // 默认图标
    if("doc"==sufix || "docx"==(sufix)){
        ico = "doc";
    }else if("xls"==sufix  || "xlsx"==sufix ){
        ico = "xls";
    }else if("ppt"==sufix  || "pptx"==sufix ){
        ico = "ppt";
    }else if("jpg"==sufix  ||  "bmp"==sufix  || "jpeg"==sufix  || "png"==sufix  || "gif"==sufix ){
        ico = "jpg";
    }else if("zip"==sufix  || "rar"==sufix  || "7z"==sufix  || "tar"==sufix ){
        ico = "rar";
    }else if("pdf"==sufix ){
        ico = "pdf";
    }else if("mp3"==sufix  || "m4a"==sufix  || "midi"==sufix  || "wma"==sufix ){
        ico = "mp3";
    }else if("txt"==sufix ){
        ico = "txt";
    }else if("pos"==(sufix)){
        ico = "pos";
    }
    return ico;
}


class MoneyType extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.onValueClick(e.target.value);
    }
    render(){
        return(
            <li value={this.props.value} onClick={this.handleClick}>{this.props.text}</li>
        );
    }
}

class MoneyRow extends React.Component {
    constructor(props) {
        super(props);
        this.rowChkClick = this.rowChkClick.bind(this);
        this.showNatureSelector = this.showNatureSelector.bind(this);
        this.billMoneyBlur = this.billMoneyBlur.bind(this);
        this.billMoneyChange = this.billMoneyChange.bind(this);

        this.handleValueClick = this.handleValueClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            moneyType:[
                { value: 1, text: "协商增收"},
                { value: 2, text: "风险收费"},
                { value: 4, text: "代付费用"},
                { value: 5, text: "计量收费"},
            ],
            text:"请选择",
            //元素控制显示
            showNatureSelectorDiv:false,
        }
    }
    handleValueClick(value){
        let moneyType = this.state.moneyType;
        var text = ""
        for(var i=0;i<moneyType.length;i++){
            if(moneyType[i].value==value){
                text = moneyType[i].text;
                break
            }
        }
        this.showNatureSelector()
        this.props.handleMoneyChange(this.props.index,"nature",value)
    }

    handleChange(id,value){
        this.props.handleMoneyChange(this.props.index,id,value)
    }

    billMoneyBlur(e){// 0 3 开票金额不得大于款项金额
        //2021/5/12 金额输入框
        var val = MoneyFormatUtil.numberTrim($.trim(e.target.value));
        var collectMoney = this.props.collectMoney;
        var nature = this.props.nature;
        var isFlagRed = this.props.isFlagRed;
        if(val==""){
            KinglexAlert.alert("开票金额不能为空！");
        }else if(isNaN(val)){
            KinglexAlert.alert("开票金额必须为数字！");
        }else if(parseFloat(val)<0){
            KinglexAlert.alert("如果您需要申请负数发票冲红，请使用“申请红字发票”");
        }else if(collectMoney!="" && collectMoney!=0 && parseFloat(val)>parseFloat(collectMoney) && (nature===0||nature===3||isFlagRed==1) ){
            KinglexAlert.alert("合同约定金额已申报给律所，不能随意修改，<i style=\"font-size: 13px;color: #ea7771;\">如果您和客户协商额外增加收款，请添加一笔新的应收款</i>");
            this.props.handleMoneyChange(this.props.index,"billMoney",collectMoney)
        }else{
            // 计算开票总额
            this.props.handleMoneyChange(this.props.index,"billMoney",val);
        }
    }
    billMoneyChange(e){
        var val = $.trim(e.target.value);
        // 计算开票总额
        this.props.handleMoneyChange(this.props.index,"billMoney",val);
    }

    showNatureSelector(){
        if(this.props.stateInput==1){
            this.setState({
                showNatureSelectorDiv:!this.state.showNatureSelectorDiv,
            })
        }
    }

    rowChkClick(){
        this.setState({
            showNatureSelectorDiv:false,
        })
        if(this.props.stateInput==1){
            this.props.handleMoneyChange(this.props.index,"stateInput",0)
        }else{
            if(this.props.isUpdate==1){
                KinglexAlert.alert("该笔款项正在变更中，需等变更审批通过或撤销变更申请后，再申请开票");
            }else{
                this.props.handleMoneyChange(this.props.index,"stateInput",1)
            }
        }
    }
    handleClick(e) {
        this.props.onValueClick(e.target.value);
    }

    render() {
        return (
            <div name="expectMoneyRow" className="invoice_line defaul_bg clear active">
                <input type="hidden" name="collectMoney" value={this.props.collectMoney}/>
                <div className="title_mod fl" style={{width:"116px",position:"relative"}}>
                    <input type="hidden" name="nature" value={this.props.nature}/>
                    {(this.props.nature===0 || this.props.nature===3) ?
                        (<div className="tl overtext" style={{textIndent:"10px"}} title={this.props.text}>{this.props.text}</div>)
                        : ( this.props.stateInput==1?(
                                <div>
                                    <div className="tl select_arrows overtext" style={{textIndent:"10px"}} onClick={this.showNatureSelector} title={this.props.text}>{this.props.text}</div>
                                    {(this.state.showNatureSelectorDiv && this.props.stateInput==1)?
                                        <ul className="tl alert_window_main_select" style={{width:"116px",height:"120px",left:"-1px",top:"40px",display: "block"}}>
                                            {this.state.moneyType.map((obj) =>
                                                <MoneyType key={obj.value} value={obj.value}  text={obj.text} onValueClick={this.handleValueClick}></MoneyType>
                                            )}
                                        </ul>
                                        :null}
                                </div>
                        ):(<div className="tl overtext" style={{textIndent:"10px"}} title={this.props.text}>{this.props.text}</div>)
                        )
                    }
                </div>
                <div className="title_mod title_name fl" style={{width:"184px",textIndent: "5px"}}>
                    <BillInputReact disabled={this.props.stateInput==0} style={{width:"172px",border:(this.props.stateInput==1?"1px solid #CCC":"none")}} class="invoice_noborder_input" name="moneyName" placeholder="请输入应收款名称" value={valueToHtml(this.props.moneyName)} onValueChange={this.handleChange} />
                </div>
                <div className="title_mod fl overtext" style={{width:"125px"}} title={this.props.collectMoney}>{this.props.collectMoney}</div>
                <div className="title_mod fl overtext" style={{width:"125px"}} title={this.props.alreadyCollect}>
                    {this.props.alreadyCollect}{this.props.isRefundFlag?<label className="EA7771">(退款后)</label>:null}
                </div>
                <div className="title_mod fl overtext" style={{  textIndent:(this.props.operateType==1?"10px":"0px"),textAlign:(this.props.operateType==1?"left":"center"),width:"150px",color:(this.props.stateInput==1?"#0066CC":"#999")}} >
                    <input type="hidden" name="state" value={this.props.stateInput}/>
                    <input style={{ cursor:"pointer"}} type="checkbox" name="id" value={this.props.id} checked={this.props.stateInput==1?"checked":""} onClick={this.rowChkClick}  readOnly/>申请开票
                    {this.props.isFlagRed==1?<label className="EA7771">(冲红/作废后)</label>:null}
                </div>
                <div className="title_mod last_title_mod fl" style={{width: "113px"}}>
                    <input autoComplete="off" disabled={this.props.stateInput==0} type="text" name="billMoney" value={this.props.billMoney} title={this.props.billMoney} placeholder="请输入开票金额" onBlur={this.billMoneyBlur} onChange={this.billMoneyChange} className="invoice_noborder_input overtext" style={{width:"103px",textIndent:"0px",textAlign:"center",color:(this.props.stateInput==1?"#0066CC":"#999"),border:(this.props.stateInput==1?"1px solid #CCC":"none")}}/>
                </div>
            </div>
        );
    }
}
class HideMoney extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:null,
            expectMoneyList:[],
            isAll:false,
        }
        this.isAll = this.isAll.bind(this);
        this.isApplyBillClick = this.isApplyBillClick.bind(this);
        this.hideMoneyClick = this.hideMoneyClick.bind(this);
        this.backMyStartWork = this.backMyStartWork.bind(this);
    }

    backMyStartWork(e){
        let id = e.target.id;
        let name = $(e.target).attr("value");
        var data = {workId:id}
        var that = this
        KinglexAlert.confim({title:"确认撤销",content:"该流程由"+name+"申请，确认要撤销吗？",ok:"撤销申请",fn:function(btn){
                if(btn=="yes"){
                    var mask = new KinglexLoadMask();
                    mask.show();
                    $.ajax({
                        type    : 'post',
                        url     : 'lawyerCenter_workflow_backMyStartWorkReact.action',
                        data    : data,
                        success : function(result){
                            mask.hide();
                            var json = eval("("+result+")");
                            if(json.success){
                                KinglexAlert.tip("撤销申请成功！");
                                that.props.loadHideMoneyList();
                            }else{
                                KinglexAlert.alert("撤销申请失败！"+json.info);
                            }
                        },
                        error   : function(){
                            mask.hide();
                            alert("发送请求失败");
                        }
                    });
                }
            }});
    }

    hideMoneyClick(e){
        let id = e.target.id;
        let expectMoneyList=this.state.expectMoneyList;
        for(let i=0;i<expectMoneyList.length;i++){
            var obj = expectMoneyList[i];
            let workId = obj[0];
            let isFlag = obj[10];
            if(id==workId){
                if(isFlag && this.props.isApplyBill){
                    KinglexAlert.alert("请先取消确认申请开票");
                    break;
                }
                isFlag = !isFlag;
                obj[10] = isFlag
                break;
            }
        }
        this.setState({
            expectMoneyList:expectMoneyList
        })

    }
    isAll(){
        let isAll = this.state.isAll;
        if(isAll && this.props.isApplyBill){
            KinglexAlert.alert("请先取消确认申请开票");
            return;
        }
        isAll = !isAll;
        let expectMoneyList=this.state.expectMoneyList;
        for(let i=0;i<expectMoneyList.length;i++){
            var obj = expectMoneyList[i];
            if(obj[9]==0||obj[9]==2||obj[9]==5||obj[9]==4){
                obj[10] = isAll;
            }
        }
        this.setState({
            isAll:isAll,
            expectMoneyList:expectMoneyList
        })
    }

    isApplyBillClick(){
        let expectMoneyList=this.state.expectMoneyList;
        let isApplyBill = this.props.isApplyBill;
        let isGo = true;
        for(let i=0;i<expectMoneyList.length;i++){
            var obj = expectMoneyList[i];
            if(!obj[10] && !isApplyBill){
                if(obj[9]==0||obj[9]==2||obj[9]==5||obj[9]==4){
                    KinglexAlert.alert("您还有未确认是否重复的发票，请先确认上述申请中的发票未重复，再操作申请开票")
                }else{
                    KinglexAlert.alert("该项目有被退回的开票申请，为了避免重复添加款项，请先将被退回的申请撤销后，再操作申请开票")
                }
                isGo = false;
                break;
            }
        }
        if(isGo){
            isApplyBill=!isApplyBill;
            this.props.isApplyBillClick(isApplyBill)
        }
    }

    componentDidMount(){
        this.initHideExpectMoney();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hideExpectMoneyList!= this.props.hideExpectMoneyList) {
            this.initHideExpectMoney();
        }
    }
    initHideExpectMoney(){
        //            list[0] = data[i][0]//workId
        //             list[9] = status//status
        let expectMoneyList=this.state.expectMoneyList;
        var lists = this.props.hideExpectMoneyList;
        for(let i=0;i<lists.length;i++){
            var obj = lists[i];
            let workId = obj[0];
            let isFlag = false;
            for(let j=0;j<expectMoneyList.length;j++){
                if(expectMoneyList[j][0]==workId){
                    isFlag = expectMoneyList[j][10]
                    break;
                }
            }
            obj[10] = isFlag;
        }
        this.setState({
            expectMoneyList:lists,
            isAll:false
        })
    }
    render() {
        return (
            <div>
                <div className="invoice_table clear" style={{borderBottom: "none"}}>
                    <div className="invoice_table_w">
                        <div className="invoice_line title_line clear" style={{borderTop:"none"}}>
                            <div className="title_mod fl" style={{width:"100px"}}>款项名称</div>
                            <div className="title_mod fl" style={{width:"100px"}}>款项金额</div>
                            <div className="title_mod fl" style={{width:"100px"}}>申请人</div>
                            <div className="title_mod fl" style={{width:"100px"}}>申请时间</div>
                            <div className="title_mod fl" style={{width:"100px"}}>发票金额</div>
                            <div className="title_mod fl" style={{width:"100px"}}>发票号码</div>
                            <div className="title_mod fl" style={{width:"100px"}}>发票状态</div>
                            <div className="title_mod last_title_mod fl" style={{width: "100px"}}>
                                <label className="check_label dis_in_block fl" style={{cursor:"pointer",paddingLeft:"25px"}}>
                                    <input type="checkbox" name="isAll" checked={this.state.isAll ? 'checked' : ''}  onClick={this.isAll} readOnly/>
                                    确认操作
                                </label>
                            </div>
                        </div>
                        <div id="hide_expectMoney_list_div" style={{borderBottom: "1px solid rgb(204, 204, 204)"}}>
                            {this.state.expectMoneyList.map((obj,index) =>
                                <div style={{position:"relative"}} name="hideExpectMoneyRow" className="invoice_line defaul_bg clear active" key={index}>
                                    <div className="title_mod title_name fl overtext" style={{height:"auto",width:"100px"}}>
                                        {obj[3].map((moneyName,indexMoneyName)=>
                                            <div style={{borderBottom: (indexMoneyName==obj[3].length-1?"none":"1px solid rgb(204, 204, 204)"),height: (indexMoneyName==obj[3].length-1?"40px":"39px")}} className="overtext" key={obj[2][indexMoneyName]} title={valueToHtml(moneyName)}>{valueToHtml(moneyName)}</div>
                                        )}
                                    </div>
                                    <div className="title_mod fl" style={{height:"auto",width:"100px",textIndent: "5px"}}>
                                        {obj[4].map((moneyCollectMoney,indexMoneyCollectMoney)=>
                                            <div style={{borderBottom: (indexMoneyCollectMoney==obj[4].length-1?"none":"1px solid rgb(204, 204, 204)"),height: (indexMoneyCollectMoney==obj[4].length-1?"40px":"39px")}} className="overtext" key={obj[2][indexMoneyCollectMoney]} title={MoneyFormatUtil.numberFormatNew(moneyCollectMoney)}>{MoneyFormatUtil.numberFormatNew(moneyCollectMoney)}</div>
                                        )}
                                    </div>
                                    <div className="title_mod fl verticalCenter overtext" style={{position:"absolute",height:"100%",width:"100px",left:"202px"}} title={obj[5]}><div className="overtext">{obj[5]}</div></div>
                                    <div className="title_mod fl verticalCenter overtext" style={{position:"absolute",height:"100%",width:"100px",left:"303px"}}><div className="overtext">{obj[6].slice(0,10)}</div></div>
                                    <div className="title_mod fl verticalCenter overtext" style={{position:"absolute",height:"100%",width:"100px",left:"404px"}}>
                                        <div className="overtext" style={{lineHeight: "normal"}}>
                                            {obj[7].redBillMoney!=null?<div className="overtext" title={"冲红"+MoneyFormatUtil.numberFormatNew(obj[7].redBillMoney)}>冲红{MoneyFormatUtil.numberFormatNew(obj[7].redBillMoney)}</div>:null}
                                            {obj[7].billMoney!=null?<div className="overtext" title={(obj[9]==0||obj[9]==1||obj[9]==2?"":"再开")+MoneyFormatUtil.numberFormatNew(obj[7].billMoney)}>{(obj[9]==0||obj[9]==1||obj[9]==2?"":"再开")+MoneyFormatUtil.numberFormatNew(obj[7].billMoney)}</div>:null}
                                        </div>
                                    </div>
                                    <div className="title_mod fl overtext verticalCenter overtext" style={{position:"absolute",height:"100%",width:"100px",left:"505px"}}>
                                        {obj[8]==-1?
                                            <div className="overtext" style={{color: "rgb(153, 153, 153)"}}>暂无</div>:
                                            <div className="overtext" style={{lineHeight: "normal"}}>
                                                {obj[8].map((data,index)=>
                                                    <div className="overtext" key={index} title={data}>{data}</div>
                                                )}
                                            </div>
                                        }
                                    </div>
                                    <div className="title_mod fl verticalCenter overtext" style={{position:"absolute",height:"100%",width:"100px",left:"606px"}} dangerouslySetInnerHTML={getStateText(obj[9])}></div>
                                    <div className="title_mod fl verticalCenter overtext" style={{position:"absolute",height:"100%",width:"100px",borderRight: "none",left:"707px"}}>
                                        {obj[9]==0||obj[9]==2||obj[9]==5||obj[9]==4?
                                            <label className="check_label dis_in_block fl" style={{cursor:"pointer",paddingLeft:"25px"}}>
                                                <input style={{marginTop: "auto"}} id={obj[0]} type="checkbox" checked={obj[10]? 'checked' : ''}  onClick={this.hideMoneyClick} readOnly/>
                                                确认未重复
                                            </label>
                                            : <a href="#" onClick={this.backMyStartWork} className="colorblue" id={obj[0]} value={obj[5]} style={{paddingLeft: "15px",color:"rgb(0, 102, 204)",textDecoration: "underline"}}>撤销再申请</a>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{color:"#666666",marginTop: "20px",    fontSize: "12px"}}>操作提示：为避免重复添加款项，请先确认上述申请中的发票未重复，并将被退回的申请撤销后，再点击下面的按钮申请开新发票</div>
                <div style={{lineHeight: "40px"}}>
                    <span className="desc billinfo_line_height dis_in_block fl">
                        <input onClick={this.isApplyBillClick} value={this.props.isApplyBill} id="isApplyBill" style={{marginTop: "9px",marginRight:"10px",cursor:"pointer"}} className={`al-toggle-button checkbox_new ${this.props.isApplyBill ? 'checked' : ''}`} type="checkbox"/><i style={{fontSize: "14px",color: (this.props.isApplyBill?"#20B759":"#999999")}}>我确认要申请新发票</i>
                    </span>
                </div>
            </div>
        )

    }
}


class Money extends React.Component{
    constructor(props) {
        super(props);
        this.addRow = this.addRow.bind(this);
        this.initExpectMoney = this.initExpectMoney.bind(this);
        this.handleMoneyChange = this.handleMoneyChange.bind(this);
        this.validatorData = this.validatorData.bind(this);
        this.validatorDataRed = this.validatorDataRed.bind(this);
        this.state = {
            id:null,
            expectMoney:[],
            totalBillMoney:"0",
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.expectMoneyList!== this.props.expectMoneyList) {
            this.initExpectMoney();
        }
    }

    initExpectMoney(){
        let expectMoney=[];
        var lists = this.props.expectMoneyList;
        var operateType = this.props.operateType;
        var totalBillMoney = "0";
        // var workValueId = $("input[name='workValueId']").val();
        // var isworkValueExist = (workValueId=="" || workValueId==null)?false:true;
        for(var i=0;i<lists.length;i++){
            var obj = lists[i];
            if(obj.moneyState!=3){
                // if(!isworkValueExist && obj.state!=0){
                //     continue;
                // }
                var isFlagRed = obj.isFlagRed!=null && obj.isFlagRed!=""?obj.isFlagRed:0;
                var defaultExpectMoneyId = $("#defaultExpectMoneyId").val();
                var stateInput = 0;
                if(defaultExpectMoneyId==""||defaultExpectMoneyId==null){
                    // if(operateType==0){
                    //     stateInput = 1;
                    // }
                }else{
                    if(obj.id==defaultExpectMoneyId){
                        stateInput = 1;
                    }
                }
                var collectMoney = obj.collectMoney;
                var nature = obj.nature;
                var naturetext = getNatureTex(obj.nature);
                var moneyName = obj.moneyName;
                var alreadyCollect = obj.alreadyCollect;
                var id = obj.id;
                var billMoney = stateInput==1?obj.collectMoney+"":"0";
                var isRefundFlag  =obj.isRefundFlag;
                var isUpdate  =obj.isUpdate;
                var money = {
                    collectMoney:collectMoney,
                    isFlagRed:isFlagRed,
                    nature:nature,
                    naturetext:naturetext,
                    moneyName:moneyName,
                    alreadyCollect:alreadyCollect,
                    isRefundFlag:isRefundFlag,
                    isUpdate:isUpdate,
                    id:id,
                    billMoney:billMoney,
                    stateInput:stateInput,
                    time:new Date().getTime()+""+i,
                }
                expectMoney.push(money);
                //处理金额
                var intVal=null;
                if(billMoney.indexOf(".")>=0){
                    intVal = billMoney.split(".")[0]+(billMoney.split(".")[1]+"00").substr(0,2)
                }else{
                    intVal = billMoney+"00"
                }
                if(stateInput==1 && billMoney*1>0){
                    totalBillMoney = addLargeInteger([totalBillMoney, intVal]);
                }
            }
        }
        if(lists.length<1){
            var money = {
                collectMoney:"",
                nature:"",
                naturetext:"请选择",
                moneyName:"",
                alreadyCollect:"",
                isFlagRed:0,
                isRefundFlag:false,
                isUpdate:0,
                id:"",
                billMoney:"",
                stateInput:1,
                time:new Date().getTime(),
            }
            expectMoney.push(money);
        }
        this.setState({
            expectMoney:expectMoney,
            totalBillMoney:doubleDown(totalBillMoney),
        })
        this.props.handleMoneyChange(doubleDown(totalBillMoney))
    }

    handleMoneyChange(key,id,value ,isCheck){
        let expectMoney = this.state.expectMoney;
        let totalBillMoney = "0";
        let flag = false;
        let flagHT = false;
        let isAlready=false;
        let isHT=false;
        let that = this;
        for(var i=0;i<expectMoney.length;i++){
            if(expectMoney[i].time==key && id=="stateInput" && value==1 && (expectMoney[i].alreadyCollect*1>0)){
                isAlready = true;
                break;
            }
            if(expectMoney[i].time==key && id=="stateInput" && value==1 && (expectMoney[i].nature === 0 || expectMoney[i].nature === 3)){
                isHT = true;
                break;
            }
        }
        for(var i=0;i<expectMoney.length;i++){
            if((expectMoney[i].alreadyCollect*1>0)  && expectMoney[i].stateInput==0 && expectMoney[i].time!=key && id=="stateInput" && value==1){
                flag = true;
                break;
            }
            if((expectMoney[i].nature === 0 || expectMoney[i].nature === 3)  && expectMoney[i].stateInput==0 && expectMoney[i].time!=key && id=="stateInput" && value==1){
                flagHT = true;
            }
        }
        if(!isAlready && flag && isCheck!=true){
            KinglexAlert.confirmNew({title:"提示",content:"该项目有“已收款”的款项未开票，为避免您误操作添加了多余的款项，请您确认一下，是否真的要使用“未收款”的款项先开票？","cancel":"我确定用“未收款项”先开票 ",ok:"我要用“已收款项”开票",fn:function(btn){
                    if(btn=="no"){
                        that.handleMoneyChange(key,id,value ,true)
                    }
                }});
            return
        }

        //2020-11-6 勾选规则改变
        if(!isAlready && !isHT && flagHT && isCheck!=true){
            KinglexAlert.confirmNew({title:"提示",content:"该项目有合同约定的“合同律师费”款项未开票，为避免您误操作添加了多余的款项，请您确认一下，是否真的要使用其他款项先开票？","cancel":"我确定用其他款项先开票",ok:"我要用合同约定款项开票",fn:function(btn){
                    if(btn=="no"){
                        that.handleMoneyChange(key,id,value ,true)
                    }
                }});
            return
        }
        for(var i=0;i<expectMoney.length;i++){
            if(expectMoney[i].time==key){
                if(id=="moneyName"){expectMoney[i].moneyName = value;break}
                else if(id=="stateInput" && value==0){expectMoney[i].stateInput = value;break}
                else if(id=="stateInput" && value==1){expectMoney[i].stateInput = value;if(expectMoney[i].billMoney == 0 && expectMoney[i].collectMoney != 0){expectMoney[i].billMoney = expectMoney[i].collectMoney+""};break}
                else if(id=="billMoney"){ expectMoney[i].billMoney = value;break}
                else if(id=="nature"){ expectMoney[i].nature = value;expectMoney[i].naturetext = getNatureTex(value);break}
            }
        }

        for(var i=0;i<expectMoney.length;i++){
            if(expectMoney[i].stateInput==1 && expectMoney[i].billMoney!="" && expectMoney[i].billMoney*1>0){
                //处理金额
                var intVal=null;
                var eBillMoney = expectMoney[i].billMoney+""
                if(eBillMoney.indexOf(".")>=0){
                    intVal = eBillMoney.split(".")[0]+(eBillMoney.split(".")[1]+"00").substr(0,2)
                }else{
                    intVal = eBillMoney+"00"
                }
                totalBillMoney = addLargeInteger([totalBillMoney, intVal]);
            }
        }

        this.setState({
            totalBillMoney:doubleDown(totalBillMoney),
            expectMoney:expectMoney
        })

        this.props.handleMoneyChange(doubleDown(totalBillMoney))
    }

    addRow(isCheck){
        let that = this;
        let expectMoney=this.state.expectMoney;
        let flag = false;
        let flagHT = false;
        for(var i=0;i<expectMoney.length;i++){
            if((expectMoney[i].alreadyCollect*1>0) && expectMoney[i].stateInput==0){
                flag = true;
                break;
            }
            if((expectMoney[i].nature === 0 || expectMoney[i].nature === 3) && expectMoney[i].stateInput==0){
                flagHT = true;
            }
        }
        if(flag && isCheck!=true){
            KinglexAlert.confirmNew({title:"提示",content:"该项目有“已收款”的款项未开票，为避免您误操作添加了多余的款项，请您确认一下，是否真的要使用“未收款”的款项先开票？","cancel":"我确定用“未收款项”先开票 ",ok:"我要用“已收款项”开票",fn:function(btn){
                    if(btn=="no"){
                        that.addRow(true)
                    }
                }});
            return
        }
        if(flagHT && isCheck!=true){
            KinglexAlert.confirmNew({title:"提示",content:"该项目有合同约定的“合同律师费”款项未开票，为避免您误操作添加了多余的款项，请您确认一下，是否真的要使用其他款项先开票？","cancel":"我确定用其他款项先开票",ok:"我要用合同约定款项开票",fn:function(btn){
                    if(btn=="no"){
                        that.addRow(true)
                    }
                }});
            return
        }
        var money = {
            collectMoney:"",
            nature:"",
            naturetext:"请选择",
            moneyName:"",
            alreadyCollect:"",
            isFlagRed:0,
            isRefundFlag:false,
            id:"",
            billMoney:"",
            stateInput:1,
            time:new Date().getTime(),
        }
        expectMoney.push(money);
        this.setState({
            expectMoney:expectMoney
        })

    }
    validatorDataRed(){
        var bool = false;
        var isBlue = false;
        let expectMoney = this.state.expectMoney;
        for(var i=0;i<expectMoney.length;i++){
            if(expectMoney[i].stateInput==1){
                if(!(expectMoney[i].alreadyCollect*1>0)){
                    isBlue = true;
                }
                var nature = expectMoney[i].nature;
                var isFlagRed = expectMoney[i].isFlagRed;
                if(nature===""){
                    KinglexAlert.alert("请选择款项类别！");
                    bool = true;
                    return false;
                }
                var moneyName = expectMoney[i].moneyName;
                if(moneyName==""){
                    KinglexAlert.alert("款项名称不能为空！");
                    bool = true;
                    return false;
                }

                var billMoney = expectMoney[i].billMoney;
                if(billMoney===""){
                    KinglexAlert.alert("开票金额不能为空！");
                    bool = true;
                    return false;
                }
                if(isNaN(billMoney)){
                    KinglexAlert.alert("开票金额必须为数字！");
                    bool = true;
                    return false;
                }
                if(billMoney==0){
                    KinglexAlert.alert("开票金额不能为零！");
                    bool = true;
                    return false;
                }

                var collectMoney = expectMoney[i].collectMoney;
                if(collectMoney!="" && collectMoney!=0 && parseFloat(billMoney)>parseFloat(collectMoney) && (nature===0||nature===3||isFlagRed==1) ){
                    KinglexAlert.alert("合同约定金额已申报给律所，不能随意修改，<i style=\"font-size: 13px;color: #ea7771;\">如果您和客户协商额外增加收款，请添加一笔新的应收款</i>");
                    bool = true;
                    return false;
                }
            }
        }
        if(bool){
            return false;
        }
        var totalBillMoney = parseFloat( this.state.totalBillMoney);
        if(totalBillMoney<=0){
            this.props.submitData(null);
        }else {
            this.props.submitData(this.state);
        }
        return true;
    }

    validatorData(){
        var bool = false;
        var isBlue = false;
        let expectMoney = this.state.expectMoney;
        for(var i=0;i<expectMoney.length;i++){
            if(expectMoney[i].stateInput==1){
                if(!(expectMoney[i].alreadyCollect*1>0)){
                    isBlue = true;
                }
                var nature = expectMoney[i].nature;
                var isFlagRed = expectMoney[i].isFlagRed;
                if(nature===""){
                    KinglexAlert.alert("请选择款项类别！");
                    bool = true;
                    return false;
                }
                var moneyName = expectMoney[i].moneyName;
                if(moneyName==""){
                    KinglexAlert.alert("款项名称不能为空！");
                    bool = true;
                    return false;
                }

                var billMoney = expectMoney[i].billMoney;
                if(billMoney===""){
                    KinglexAlert.alert("开票金额不能为空！");
                    bool = true;
                    return false;
                }
                if(isNaN(billMoney)){
                    KinglexAlert.alert("开票金额必须为数字！");
                    bool = true;
                    return false;
                }
                if(billMoney==0){
                    KinglexAlert.alert("开票金额不能为零！");
                    bool = true;
                    return false;
                }

                var collectMoney = expectMoney[i].collectMoney;
                if(collectMoney!="" && collectMoney!=0 && parseFloat(billMoney)>parseFloat(collectMoney) && (nature===0||nature===3||isFlagRed==1) ){
                    KinglexAlert.alert("合同约定金额已申报给律所，不能随意修改，<i style=\"font-size: 13px;color: #ea7771;\">如果您和客户协商额外增加收款，请添加一笔新的应收款</i>");
                    bool = true;
                    return false;
                }
            }
        }
        if(bool){
            return false;
        }
        var totalBillMoney = parseFloat( this.state.totalBillMoney);
        if(totalBillMoney<=0){
            KinglexAlert.alert("开票金额必填大于0，请修改开票金额后再提交！");
            return false;
        }
        this.props.submitData(this.state);
        return true;
    }

    componentDidMount() {
        var id=new Date().getTime() + Math.random()
        eventHub.on('validatorData',id, this.validatorData);
        eventHub.on('validatorDataRed',id, this.validatorDataRed);
        this.setState({
            id:id,
        })
        this.initExpectMoney();
    }

    componentWillUnmount() {
        var id = this.state.id;
        eventHub.remove("validatorData",id);
        eventHub.remove("validatorDataRed",id)
    }

    render() {
        return(
            <div>
                <div className="invoice_table clear" style={{borderBottom: "none"}}>
                    <div className="invoice_table_w">
                        <div className="invoice_line title_line clear" style={{borderTop:"none"}}>
                            <div className="title_mod fl" style={{width:"116px"}}>款项类别</div>
                            <div className="title_mod fl" style={{width:"184px"}}>款项名称</div>
                            <div className="title_mod fl" style={{width:"125px"}}>款项金额</div>
                            <div className="title_mod fl" style={{width:"125px"}}>已收金额</div>
                            <div className="title_mod fl" style={{width:"150px"}}>操作</div>
                            <div className="title_mod last_title_mod fl" style={{width: "110px"}}>申请开票金额</div>
                        </div>
                        <div id="expectMoney_list_div">
                            {this.state.expectMoney.map((obj) =>
                                <MoneyRow operateType={this.props.operateType}  text={obj.naturetext} key={obj.time} index={obj.time} id={obj.id} collectMoney={obj.collectMoney}  alreadyCollect={obj.alreadyCollect}  moneyName={obj.moneyName}  nature={obj.nature} handleMoneyChange={this.handleMoneyChange} billMoney={obj.billMoney} stateInput={obj.stateInput} isFlagRed={obj.isFlagRed} isRefundFlag={obj.isRefundFlag} isUpdate={obj.isUpdate}></MoneyRow>
                            )}
                        </div>
                    </div>
                    <div className="invoice_line active clear" style={{lineHeight: "40px",borderBottom: "#ccc solid 1px"}}>
                        <div className="title_mod title_name fl link_active" style={{borderRight: "none",width:"116px"}} onClick={this.addRow}>+添加开票款项</div>
                        <div className="title_mod fl" style={{width: "185px",borderRight: "none"}}></div>
                        <div className="title_mod fl" style={{width: "126px",borderRight: "none"}}></div>
                        <div className="title_mod fl" style={{width: "126px",borderRight: "none"}}></div>
                        <div className="title_mod fl" style={{width:"151px",borderRight: "none",textAlign: "center",color:"#0066cc"}}>发票金额统计：</div>
                        <div className="title_mod last_title_mod fl overtext" style={{width: "110px",textAlign: "center",color:"#0066cc"}} title={"￥"+MoneyFormatUtil.numberFormatNew(this.state.totalBillMoney)}>
                            <em id="billMoneyShow">￥{MoneyFormatUtil.numberFormatNew(this.state.totalBillMoney)}</em>
                        </div>
                        <input type="hidden" id="totalBillMoney" name="totalBillMoney" value={this.state.totalBillMoney}/>
                    </div>
                </div>
                {this.state.totalBillMoney>0?
                    <div className="overtext" title={"蓝票金额合计：￥"+MoneyFormatUtil.numberFormatNew(this.state.totalBillMoney)+"（大写："+MoneyFormatUtil.toChinese(this.state.totalBillMoney)+"）"} style={{color:"#0066cc",marginTop: "20px",    fontSize: "14px"}}>蓝票金额合计：￥{MoneyFormatUtil.numberFormatNew(this.state.totalBillMoney)}（大写：{MoneyFormatUtil.toChinese(this.state.totalBillMoney)}）</div>
                    :null}
            </div>
        );
    }
}

function getNatureTex(value){
    var result = "请选择";
    if(value!=null && value!="null"){
        switch(value){
            case 0:
                result = "合同律师费";
                break;
            case 1:
                result = "协商增收";
                break;
            case 2:
                result = "风险收费";
                break;
            case 3:
                result = "合同差旅费";
                break;
            case 4:
                result = "代付费用";
                break;
            case 5:
                result = "计量收费";
                break;
        }
    }
    return result;
}

function getStateText(value) {
    var result = "请选择";
    if(value!=null && value!="null"){
        switch(value){
            case 0:
                result = "<p style='color: #20B759;'>正常开票</p>";
                break;
            case 1:
                result = "<p style='color: #FF0000;'>开票被退回</p>";
                break;
            case 2:
                result = "<p style='color: #F78F27;'>开票申请中</p>";
                break;
            case 3:
                result = "<p style='color: #F78F27;'>冲红/作废再开中</p>";
                break;
            case 4:
                result = "<p style='color: #EA7771;'>冲红/作废中</p>";
                break;
            case 5:
                result = "<p style='color: #FF0000;'>冲红/作废被退回</p>";
                break;
        }
    }
    var html = {__html:result};
    return html;
}
class PercentRow extends React.Component{
    constructor(props) {
        super(props);
        this.participateInventoryChk = this.participateInventoryChk.bind(this);
        this.handlePercentChange = this.handlePercentChange.bind(this);
        this.handlePercentBlur = this.handlePercentBlur.bind(this);
        this.getEmpinfoNameDivSingleByPercentReact = this.getEmpinfoNameDivSingleByPercentReact.bind(this);
        this.selectCallBack = this.selectCallBack.bind(this);
        this.removeCallBack = this.removeCallBack.bind(this);
    }

    getEmpinfoNameDivSingleByPercentReact(e){
        var eTarget = e.target;
        var obj=null;
        if(eTarget.id=="lowerParent"){
            obj = eTarget;
        }else{
            obj = $(eTarget).parents("#lowerParent")
        }
        getEmpinfoNameDivSingleByPercent(obj,this.selectCallBack,this.removeCallBack)
    }

    removeCallBack(obj,empId,empName,photo){
        var values=[empId,empName];
        this.props.handlePercentChange(this.props.index,"removeEmpId",values)
    }

    selectCallBack(obj,empId,empName,photo){
        var values=[empId,empName];
        this.props.handlePercentChange(this.props.index,"empId",values)
    }

    handlePercentChange(id,val){
        this.props.handlePercentChange(this.props.index,id,val)
    }
    handlePercentBlur(id,val){
        this.props.handlePercentBlur(this.props.index,id,val)
    }

    participateInventoryChk(e){
        var curCropId  =  this.props.curCropId;//根据当前所选团队查询所在结算所
        var curCropName  =  this.props.curCropName;
        var isAuto  =  this.props.isAuto;
        var assignMsg="";
        var isAllocation="";
        assignMsg += "该案件所属于【"+curCropName+"】，";
        var empId = this.props.empId;
        var cropId = this.props.cropId;
        var empName= this.props.empName;
        var isPartake = this.props.isPartake;
        if(isPartake==1){
            isPartake=0;
            this.props.handlePercentChange(this.props.index,"isPartake",isPartake)
        }else{
            var flag = 0;
            var isGo = 0;
            var noPerson = 0;
            if(empId==null||empId==undefined||empId==""){
                if(null!=cropId && cropId!="" && cropId!=curCropId){
                    assignMsg += "【 "+empName+"】";
                    flag += 1;
                }else{
                    if(null!=cropId && cropId!=""){
                        $.ajax({
                            type    : 'post',
                            url     : 'lawyerCenter_case_getIsSetByCorpId.action',
                            data    : {cropId:cropId},
                            async 	: false, // 设为同步
                            success : function(result){
                                var json = eval("("+result+")");
                                if(json.isSet=="false"){
                                    isAllocation += "【 "+empName+"】";
                                    isGo += 1;
                                }
                            },
                        });
                    }else{//没有选择分配人
                        noPerson++;
                    }
                }
            }else{
                $.ajax({
                    type    : 'post',
                    url     : 'lawyerCenter_case_getCorpInfoAndIsAllocationByEmpId.action',
                    data    : {empId:empId},
                    async 	: false, // 设为同步
                    success : function(result){
                        var json = eval("("+result+")");
                        //判断律师是否归属与当前团队所属于的结算所
                        if(curCropId!=json.cropId){

                            assignMsg += "【 "+empName+"】";
                            flag += 1;
                        }else{
                            if(json.isAllocation!=1){
                                isAllocation += "【 "+empName+"】";
                                isGo += 1;
                            }
                        }
                    },
                });
            }
            assignMsg += "不参与该所分配，请调整分配比例。<br/>";
            isAllocation += "暂时没有开通参与分配功能，如有需要，请联系实施顾问设置开通后再填写分配比例。<br/>";
            var thatObj =this;
            if(flag>0){
                isPartake=0;
                KinglexAlert.alert(assignMsg,function(){
                    thatObj.props.handlePercentChange(thatObj.props.index,"remove");
                });
            }else if(isGo>0){
                isPartake=0;
                KinglexAlert.alert(isAllocation,function(){
                    thatObj.props.handlePercentChange(thatObj.props.index,"remove");
                });
            }else if(noPerson>0){
                isPartake=0;
                KinglexAlert.alert("请先选择创收人");
            }else{
                isPartake=1;
                this.props.handlePercentChange(this.props.index,"isPartake",isPartake)
            }
        }
    }

    render() {
        return (
            <tr index={this.props.time}>
                <td style={{    textAlign: "left"}}>
                    <div className="overtext" style={{width: "185px"}} title={this.props.roles}>{this.props.roles}</div>
                </td>
                <td style={{    textIndent: "0px"}} title={this.props.empName}>
                    {this.props.empName==""?
                        <div id="lowerParent" onClick={this.getEmpinfoNameDivSingleByPercentReact} style={{height: "36px", lineHeight: "36px"}}>
                            <div id="click_Select_Lower" className="percent_lawyer_select"><i> </i>
                                <font>选择人员</font>
                            </div>
                        </div> :(this.props.isAdd==0?<div className="overtext" style={{maxWidth: "163px"}}>{this.props.empName}</div>:
                            <div id="lowerParent" onClick={this.getEmpinfoNameDivSingleByPercentReact} style={{height: "36px", lineHeight: "36px"}}>
                                <div id="click_Select_Lower" className="percent_lawyer_select"><i> </i>
                                    <font>选择人员</font>
                                </div>
                            </div>)
                    }
                </td>
                <td>
                    <input type="hidden" name="assignType" value={this.props.assignType}/>
                    <input type="hidden" name="empId" value={this.props.empId}/>
                    <input type="hidden" name="cropId" value={this.props.cropId}/>
                    <input type="hidden" name="isPartake" value={this.props.isPartake}/>
                    <input className={`al-toggle-button checkbox_new ${this.props.isPartake==1? 'checked' : ''}` } name="isPartake" type="checkbox" style={{margin: "0px 0px 0px 35px", cursor: "pointer"}} onClick={this.participateInventoryChk} data-value={this.props.isPartake}/>
                    <span style={{display: "inline-block",width: "52px",textAlign: "left",marginRight: "10px",textIndent: "0px"}}>{this.props.isPartake==1? "参与":"不参与"}</span>
                </td>
                <td style={{textIndent: "0px"}}>
                    <BillInputReact style={{width: "135px",height:"30px",background: "#fff",border:(this.props.isPartake==1?"1px solid #CCC":"none")}} disabled={this.props.isPartake==0} class="tabContentInput" name="taxPercent"  value={this.props.taxPercent} onValueChange={this.handlePercentChange} onValueBlur={this.handlePercentBlur}/>
                    &nbsp;%
                </td>
                <td style={{textIndent: "0px"}}>
                    <BillInputReact style={{width: "150px",height:"30px",background: "#fff",border:(this.props.isPartake==1?"1px solid #CCC":"none")}} disabled={this.props.isPartake==0} class="tabContentInput" name="taxMoney"  value={this.props.taxMoney} onValueChange={this.handlePercentChange} onValueBlur={this.handlePercentBlur}/>
                </td>
            </tr>
        );
    }
}

class Percent extends React.Component{
    constructor(prors){
        super(prors)
        this.initPercent = this.initPercent.bind(this);
        this.calMoneyAndPercent = this.calMoneyAndPercent.bind(this);
        this.addRow = this.addRow.bind(this);
        this.addCorpTaxPercent = this.addCorpTaxPercent.bind(this);
        this.handlePercentChange = this.handlePercentChange.bind(this);
        this.handlePercentBlur = this.handlePercentBlur.bind(this);
        this.validatorData = this.validatorData.bind(this);

        this.state = {
            id:null,
            percentList:[],
            totalBillMoney:"0",
            corpJoinAssignState:false,
            corpJoinAssignChecked:false,
            percentEmpId:[],
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.percentList!== this.props.percentList) {
            this.initPercent();
        }
        if (prevProps.totalMoney!== this.props.totalMoney) {
            this.calMoneyAndPercent();
        }
    }

    initPercent(){
        let percentList=[];
        let percentEmpId=[];
        let corpJoinAssignState=false;
        var corpJoinAssignChecked = false;
        var lists = this.props.percentList;
        var corpJoinAssign = this.props.corpJoinAssign;
        var isAuto = this.props.isAuto;
        var totalMoney = this.props.totalMoney;
        if(null!=corpJoinAssign && (corpJoinAssign=="true" || corpJoinAssign==true)){
            corpJoinAssignState = true;
        }
        let totalBillMoney = "0";
        if(lists!=null && lists.length>0){
            for(var i=0;i<lists.length;i++){
                var obj = lists[i];
                corpJoinAssignChecked = obj.assignType==0?corpJoinAssignChecked:true;
                var roles = obj.assignType==0?getRoles(obj.managerName):"律所";
                var empName = obj.assignType==0?obj.empName:obj.cropName;
                var assignType = (obj.assignType==null || obj.assignType=="")?0:obj.assignType;
                var isPartake = (obj.isPartake==null || obj.isPartake=="")?0:obj.isPartake;
                var empId = obj.empId;
                var cropId = obj.cropId;
                var taxPercent = obj.taxPercent;
                var taxMoney = (isPartake==1 && taxPercent!="" && totalMoney!="")?((taxPercent/100) *parseFloat(totalMoney)).toFixed(2):"0";
                //处理金额
                var intVal=null;
                if(taxMoney.indexOf(".")>=0){
                    intVal = taxMoney.split(".")[0]+(taxMoney.split(".")[1]+"00").substr(0,2)
                }else{
                    intVal = taxMoney+"00"
                }
                if(isPartake==1 && taxPercent!="" && totalMoney!="" && totalMoney*1>0 && taxMoney*1>0){
                    totalBillMoney = addLargeInteger([totalBillMoney, intVal]);
                }
                var percent={
                    roles:roles,
                    empName:empName,
                    assignType:assignType,
                    isPartake:isPartake,
                    empId:empId,
                    cropId:cropId,
                    taxPercent:taxPercent,
                    taxMoney:taxMoney,
                    time:new Date().getTime()+""+i,
                    isAdd:0,
                }
                percentList.push(percent);
                percentEmpId.push(percent.empId);
            }
        }
        this.setState({
            totalBillMoney:doubleDown(totalBillMoney),
            percentList:percentList,
            percentEmpId:percentEmpId,
            corpJoinAssignChecked:corpJoinAssignChecked,
            corpJoinAssignState:corpJoinAssignState,
            isAuto:isAuto,
        })
    }

    addRow(){
        var cropId = this.props.cropId;
        if(cropId==""){
            KinglexAlert.alert('请先选择项目！');
        }else{
            let percentList=this.state.percentList;
            var percent={
                roles:"其他参与人",
                empName:"",
                assignType:0,
                isPartake:0,
                empId:"",
                cropId:"",
                taxPercent:0,
                taxMoney:"0",
                time:new Date().getTime(),
                isAdd:1,
            }
            percentList.push(percent);
            this.setState({
                percentList:percentList
            })
        }
    }

    addCorpTaxPercent(){
        var cropId = this.props.cropId;
        if(cropId==""){
            KinglexAlert.alert('请先选择项目！');
        }else{
            var corpJoinAssignChecked = this.state.corpJoinAssignChecked;
            let percentList=this.state.percentList;
            if(corpJoinAssignChecked){//移除
                for(var i=0;i<percentList.length;i++){
                    if(percentList[i].assignType==1){
                        percentList.splice(i,1)
                        break;
                    }
                }
            }else{//添加
                var percent={
                    roles:"律所",
                    empName: this.props.cropName,
                    assignType:1,
                    isPartake:0,
                    empId:"",
                    cropId: this.props.cropId,
                    taxPercent:0,
                    taxMoney:"0",
                    time:new Date().getTime(),
                    isAdd:0,
                }
                percentList.push(percent);
            }
            corpJoinAssignChecked = !corpJoinAssignChecked
            this.setState({
                corpJoinAssignChecked:corpJoinAssignChecked,
                percentList:percentList
            })
        }
    }

    calMoneyAndPercent(){
        let percentList = this.state.percentList;
        let totalMoney = this.props.totalMoney;
        let totalBillMoney = "0";
        for(var i=0;i<percentList.length;i++){
            var taxMoney = (percentList[i].isPartake==1 && percentList[i].taxPercent!="" && totalMoney!="")?((percentList[i].taxPercent/100) *parseFloat(totalMoney)).toFixed(2):"0";
            percentList[i].taxMoney = taxMoney;
            //处理金额
            var intVal=null;
            if(taxMoney.indexOf(".")>=0){
                intVal = taxMoney.split(".")[0]+(taxMoney.split(".")[1]+"00").substr(0,2)
            }else{
                intVal = taxMoney+"00"
            }
            if(percentList[i].isPartake==1 && percentList[i].taxPercent!="" && totalMoney!="" && totalMoney*1>0 && taxMoney*1>0){
                totalBillMoney = addLargeInteger([totalBillMoney, intVal]);
            }
        }
        this.setState({
            totalBillMoney:doubleDown(totalBillMoney),
            percentList:percentList
        })
    }

    handlePercentBlur(key,id,value){
        //2021/5/12 金额输入框
        value = MoneyFormatUtil.numberTrim($.trim(value));
        let percentList = JSON.parse(JSON.stringify(this.state.percentList));
        let isAuto = JSON.parse(JSON.stringify(this.state.isAuto));
        let percentEmpId = JSON.parse(JSON.stringify(this.state.percentEmpId));
        let totalMoney = this.props.totalMoney;
        let totalBillMoney = "0";
        for(var i=0;i<percentList.length;i++){
            if(percentList[i].time==key){
                if(id=="remove"){
                    $("#percent_tbody").find("tr[index='"+key+"']").find("i[name='delete_empName_div_i']").click();
                    var index = percentEmpId.indexOf(percentList[i].empId);
                    if(index>=0){
                        percentEmpId.splice(index,1);
                    }
                    percentList[i].empId = "";
                    percentList[i].empName = "";
                    percentList[i].isPartake=0;
                    percentList[i].taxMoney = "0";
                    percentList[i].taxPercent = 0;
                    break;
                }
                if(id=="isPartake"){
                    percentList[i].isPartake = value;
                    if(value==0){
                        percentList[i].taxPercent = 0;
                        percentList[i].taxMoney = "0";
                    }
                    break
                } else if(id=="taxPercent"){
                    isAuto = false;
                    if($.trim(value)===""){
                        KinglexAlert.alert("比例不能为空！");
                    }else if(isNaN($.trim(value))){
                        KinglexAlert.alert("比例必须为数字！");
                    }else if(parseFloat($.trim(value))<=0){
                        KinglexAlert.alert("比例必须大于零");
                    }else{
                        percentList[i].taxPercent = $.trim(value);
                        percentList[i].taxMoney =  Number(($.trim(value) *parseFloat(totalMoney))/100).toFixed(2);
                    }
                    break
                } else if(id=="taxMoney"){
                    isAuto = false;
                    if($.trim(value)===""){
                        KinglexAlert.alert("金额不能为空！");
                    }else if(isNaN($.trim(value))){
                        KinglexAlert.alert("金额必须为数字！");
                    }else if(parseFloat($.trim(value))<=0){
                        KinglexAlert.alert("金额必须大于零");
                    }else{
                        percentList[i].taxMoney = $.trim(value);
                        percentList[i].taxPercent = (($.trim(value)*100)/parseFloat(totalMoney)).toFixed(2);
                    }
                    break
                } else if(id=="empId"){
                    if(percentEmpId.indexOf(value[0])>=0){
                        KinglexAlert.alert("该分配人已存在，请确认后重新选择");
                        $("#percent_tbody").find("tr[index='"+key+"']").find("i[name='delete_empName_div_i']").click();
                    }else{
                        if(percentList[i].empId!=""){
                            var index = percentEmpId.indexOf(percentList[i].empId);
                            if(index>=0){
                                percentEmpId.splice(index,1);
                            }
                        }
                        percentEmpId.push(value[0]);
                        percentList[i].empId = value[0];
                        percentList[i].empName = value[1];
                    }
                    break;
                } else if(id=="removeEmpId"){
                    var index = percentEmpId.indexOf(percentList[i].empId);
                    if(index>=0){
                        percentEmpId.splice(index,1);
                    }
                    percentList[i].empId = "";
                    percentList[i].empName = "";
                    percentList[i].isPartake=0;
                    percentList[i].taxMoney = "0";
                    percentList[i].taxPercent = 0;
                    break;
                }
            }
        }
        if(isAuto){//自动均摊
            var num = 0;
            for(var i=0;i<percentList.length;i++){
                if(percentList[i].isPartake==1){
                    num++;
                }
            }
            let money = (totalMoney/num).toFixed(2);
            let percent = ((money*100)/totalMoney).toFixed(2);
            let moneyLast = (new Decimal(totalMoney).sub(new Decimal((num-1)*money))).toNumber()+"";
            let percentLast =  new Decimal(100).sub(new Decimal((num-1)*percent))

            for(var i=0;i<percentList.length;i++){
                if(percentList[i].isPartake==1){
                    num--;
                    if(num==0){
                        money = moneyLast
                        percent = percentLast
                    }
                    percentList[i].taxMoney = money;
                    percentList[i].taxPercent = percent;
                }
            }
        }
        for(var i=0;i<percentList.length;i++){
            if(percentList[i].isPartake==1 && percentList[i].taxMoney!="" && percentList[i].taxMoney*1>0){
                //处理金额
                var intVal=null;
                var pTaxMoney = percentList[i].taxMoney+"";
                if(pTaxMoney.indexOf(".")>=0){
                    intVal = pTaxMoney.split(".")[0]+(pTaxMoney.split(".")[1]+"00").substr(0,2)
                }else{
                    intVal = pTaxMoney+"00"
                }
                totalBillMoney = addLargeInteger([totalBillMoney, intVal]);
            }
        }
        if(parseFloat(doubleDown(totalBillMoney))>parseFloat(totalMoney)){
            KinglexAlert.alert("比例金额合计已大于开票金额，请调整相应金额！");
        }else{
            this.setState({
                totalBillMoney:doubleDown(totalBillMoney),
                percentList:percentList,
                percentEmpId:percentEmpId,
                isAuto:isAuto,
            })
        }
    }

    handlePercentChange(key,id,value){
        let percentList = JSON.parse(JSON.stringify(this.state.percentList));
        let isAuto = JSON.parse(JSON.stringify(this.state.isAuto));
        let percentEmpId = JSON.parse(JSON.stringify(this.state.percentEmpId));
        let totalMoney = this.props.totalMoney;
        let totalBillMoney = "0";
        for(var i=0;i<percentList.length;i++){
            if(percentList[i].time==key){
                if(id=="remove"){
                    $("#percent_tbody").find("tr[index='"+key+"']").find("i[name='delete_empName_div_i']").click();
                    var index = percentEmpId.indexOf(percentList[i].empId);
                    if(index>=0){
                        percentEmpId.splice(index,1);
                    }
                    percentList[i].empId = "";
                    percentList[i].empName = "";
                    percentList[i].isPartake=0;
                    percentList[i].taxMoney = "0";
                    percentList[i].taxPercent = 0;
                    break;
                }
                if(id=="isPartake"){
                    percentList[i].isPartake = value;
                    if(value==0){
                        percentList[i].taxPercent = 0;
                        percentList[i].taxMoney = "0";
                    }
                    break
                } else if(id=="taxPercent"){
                    isAuto = false;
                    percentList[i].taxPercent = $.trim(value);
                    percentList[i].taxMoney =  Number(($.trim(value) *parseFloat(totalMoney))/100).toFixed(2);
                    break
                } else if(id=="taxMoney"){
                    isAuto = false;
                    percentList[i].taxMoney = $.trim(value);
                    percentList[i].taxPercent = (($.trim(value)*100)/parseFloat(totalMoney)).toFixed(2);
                    break
                } else if(id=="empId"){
                    if(percentEmpId.indexOf(value[0])>=0){
                        KinglexAlert.alert("该分配人已存在，请确认后重新选择");
                        $("#percent_tbody").find("tr[index='"+key+"']").find("i[name='delete_empName_div_i']").click();
                    }else{
                        if(percentList[i].empId!=""){
                            var index = percentEmpId.indexOf(percentList[i].empId);
                            if(index>=0){
                                percentEmpId.splice(index,1);
                            }
                        }
                        percentEmpId.push(value[0]);
                        percentList[i].empId = value[0];
                        percentList[i].empName = value[1];
                    }
                    break;
                } else if(id=="removeEmpId"){
                        var index = percentEmpId.indexOf(percentList[i].empId);
                        if(index>=0){
                            percentEmpId.splice(index,1);
                        }
                        percentList[i].empId = "";
                        percentList[i].empName = "";
                        percentList[i].isPartake=0;
                        percentList[i].taxMoney = "0";
                        percentList[i].taxPercent = 0;
                    break;
                }
            }
        }
        if(isAuto){//自动均摊
            var num = 0;
            for(var i=0;i<percentList.length;i++){
                if(percentList[i].isPartake==1){
                    num++;
                }
            }
            let money = (totalMoney/num).toFixed(2);
            let percent = ((money*100)/totalMoney).toFixed(2);
            let moneyLast = (new Decimal(totalMoney).sub(new Decimal((num-1)*money))).toNumber()+"";
            let percentLast =  new Decimal(100).sub(new Decimal((num-1)*percent))

            for(var i=0;i<percentList.length;i++){
                if(percentList[i].isPartake==1){
                    num--;
                    if(num==0){
                        money = moneyLast
                        percent = percentLast
                    }
                    percentList[i].taxMoney = money;
                    percentList[i].taxPercent = percent;
                }
            }
        }
        for(var i=0;i<percentList.length;i++){
            if(percentList[i].isPartake==1 && percentList[i].taxMoney!="" && percentList[i].taxMoney*1>0){
                //处理金额
                var intVal=null;
                var pTaxMoney = percentList[i].taxMoney+"";
                if(pTaxMoney.indexOf(".")>=0){
                    intVal = pTaxMoney.split(".")[0]+(pTaxMoney.split(".")[1]+"00").substr(0,2)
                }else{
                    intVal = pTaxMoney+"00"
                }
                totalBillMoney = addLargeInteger([totalBillMoney, intVal]);
            }
        }
        if(parseFloat(doubleDown(totalBillMoney))>parseFloat(totalMoney)){
            KinglexAlert.alert("比例金额合计已大于开票金额，请调整相应金额！");
        }else{
            this.setState({
                totalBillMoney:doubleDown(totalBillMoney),
                percentList:percentList,
                percentEmpId:percentEmpId,
                isAuto:isAuto,
            })
        }
    }

    validatorData(){
        let totalMoney = this.props.totalMoney;
        let totalBillMoney =this.state.totalBillMoney;
        let percentList = this.state.percentList;
        if(totalBillMoney!=totalMoney){
            KinglexAlert.alert("分配总金额必须等于开票总金额，请调整相应金额后再提交！");
            return false;
        }
        var isGo=true;
        for(var i=0;i<percentList.length;i++){
            if(percentList[i].isPartake==1){
                var taxMoney = percentList[i].taxMoney;
                var assignType = percentList[i].assignType;
                if(taxMoney===""){
                    KinglexAlert.alert("参与分配的金额不能为空！请调整相应比例金额后再提交");
                    isGo=false;
                    return
                }
                if(isNaN(taxMoney)){
                    KinglexAlert.alert("参与分配的金额必须为数字！请调整相应比例金额后再提交");
                    isGo=false;
                    return
                }
                if(taxMoney==0){
                    KinglexAlert.alert("参与分配的金额不能为零！请调整相应比例金额后再提交");
                    isGo=false;
                    return
                }

                if(assignType==1 && !this.state.corpJoinAssignState){
                    KinglexAlert.alert("律所不参与分配，请设置为不参与");
                    isGo=false;
                    return
                }
            }
        }
        if(!isGo){
            return false;
        }
        this.props.submitData(this.state);
        return true;
    }
    componentDidMount() {
        var id=new Date().getTime() + Math.random()
        eventHub.on('validatorData',id,this.validatorData);
        eventHub.on('validatorDataRedToOther',id,this.validatorData)
        this.setState({
            id:id,
        })
        this.initPercent();
    }

    componentWillUnmount() {
        var id = this.state.id;
        eventHub.remove("validatorData",id)
        eventHub.remove("validatorDataRedToOther",id)
    }

    render() {
        return(
            <div id="percent_div" className="finance_right_tab" style={{marginBottom: "30px"}}>
                <table className="tab" style={{width:"820px"}}>
                    <thead>
                    <tr>
                        <th className="textcenter" width="23%" style={{ fontSize: "12px",color: "#333"}}>本案角色</th>
                        <th className="textcenter" width="20%" style={{ fontSize: "12px",color: "#333"}}>创收人</th>
                        <th className="textcenter" width="17%" style={{ fontSize: "12px",color: "#333"}}>是否参与</th>
                        <th className="textcenter" width="20%" style={{ fontSize: "12px",color: "#333"}}>分配比例</th>
                        <th className="textcenter" width="20%" style={{ fontSize: "12px",color: "#333"}}>分配金额</th>
                    </tr>
                    </thead>
                    <tbody id="percent_tbody">
                    {this.state.percentList.map((obj) =>
                        <PercentRow time={obj.time} isAdd={obj.isAdd} isAuto={this.state.isAuto} key={obj.time}curCropId={this.props.cropId} curCropName={this.props.cropName}  roles={obj.roles} empName={obj.empName} assignType={obj.assignType} isPartake={obj.isPartake}  empId={obj.empId}  cropId={obj.cropId}  taxPercent={obj.taxPercent} taxMoney={obj.taxMoney} index={obj.time} handlePercentChange={this.handlePercentChange} handlePercentBlur={this.handlePercentBlur}></PercentRow>
                    )}
                    </tbody>
                    <tfoot>
                    <tr >
                        <td style={{color: "#666",border: "unset",textAlign: "left",cursor:"pointer"}} onClick={this.addRow}>+添加其他参与人</td>
                        <td style={{color: "#666",border: "unset"}}>
                            {this.state.corpJoinAssignState?
                                <label id="corpJoinAssign" style={{cursor:"pointer"}}><input type="checkbox" name="corpAssign" style={{verticalAlign: "0px"}} checked={this.state.corpJoinAssignChecked ? 'checked' : ''} onClick={this.addCorpTaxPercent} readOnly/>&nbsp;律所是否参与分配</label>
                                :null}
                        </td>
                        <td style={{color: "#666",border: "unset"}}>&nbsp;</td>
                        <td style={{color:"#0066cc",border: "unset",fontWeight: "normal"}}>分配金额合计</td>
                        <td style={{color:"#0066cc",border: "unset",fontWeight: "normal"}}><label id="totalMoney">{this.state.totalBillMoney}</label></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
function getRoles(type){
    var typpes= type.split(",")
    var roleNames = "";
    for(var i=0;i<typpes.length;i++){
        var roleName = getRole(typpes[i])
        roleNames+=roleName+",";
    }
    if(roleNames!=""){
        roleNames = roleNames.substring(0,roleNames.length-1);
    }
    return roleNames;
}

function getRole(id){
    if(id===0||id==="0"){
        return "业务主管"
    }else if(id==1){
        return "协办律师"
    }else if(id==2){
        return "其他协助人员"
    }else if(id==3){
        return "案源开拓人"
    }else if(id==4){
        return "业务协管/合伙人"
    }else if(id==5){
        return "主办律师"
    }else if(id==6){
        return "线索获取人"
    }else{
        return "其他参与人"
    }
}

function concat_() {
    let arr_ = Array.prototype.slice.call(arguments);
    let result = [];
    arr_.forEach(self => {
        result.push.apply(result, self);
    });
    return result;
};

function addStatus(data,status){
    let lists = []
    if(status==0||status==2||status==1){//已开票，开票申请中，开票被退回
        for(var i=0;i<data.length;i++){
            let list = []
            list[0] = data[i][0]//workId
            list[1] = data[i][1]//startId
            list[2] = data[i][2].split(",")//moneyId 拆分
            list[3] = data[i][3].split(",")//moneyName 拆分
            list[4] = data[i][4].split(",")//moneyCollectMoney 拆分
            list[5] = data[i][5]//startName
            list[6] = data[i][6]//startTime
            list[7] = {billMoney: data[i][8]}//{redBillMoney,billMoney}
            // list[7] = data[i][8]//billMoney
            list[8] = data[i][9].split(",")//billNo
            list[9] = status//status
            lists[i]=list
        }
    }else {//冲红/作废被退回，冲红/作废申请中
        for (var i = 0; i < data.length; i++) {
            let list = []
            list[0] = data[i][0]//workId
            list[1] = data[i][1]//redId

            let redBillMoneyId = data[i][6].split(",")//redBillMoneyId 拆分
            let redBillMoneyName = data[i][7].split(",")//moneyName 拆分
            let redBillMoneyCollectMoney = data[i][8].split(",")//moneyCollectMoney 拆分

            let billMoneyId = [];
            let billMoneyName = [];
            let billMoneyCollectMoney = [];
            if(data[i][10]!=null){
                billMoneyId = data[i][10].split(",")//billMoneyId 拆分
                billMoneyName = data[i][11].split(",")//moneyName 拆分
                billMoneyCollectMoney = data[i][12].split(",")//moneyCollectMoney 拆分
            }
            for(let index=0;index<billMoneyId.length;index++){
                if(!redBillMoneyId.includes(billMoneyId[index])){
                    redBillMoneyName[redBillMoneyName.length]=billMoneyName[index]
                    redBillMoneyCollectMoney[redBillMoneyCollectMoney.length]=billMoneyCollectMoney[index]
                    redBillMoneyId[redBillMoneyId.length]=billMoneyId[index]
                }
            }
            // list[2] = Array.from(new Set(concat_(redBillMoneyId, billMoneyId)));
            // list[3] = Array.from(new Set(concat_(redBillMoneyName, billMoneyName)));
            // list[4] = Array.from(new Set(concat_(redBillMoneyCollectMoney, billMoneyCollectMoney)));
            list[2] = redBillMoneyId;
            list[3] = redBillMoneyName;
            list[4] = redBillMoneyCollectMoney;

            list[5] = data[i][3]//createEmpName
            list[6] = data[i][2]//createTime
            list[7] = {redBillMoney: data[i][5]+"", billMoney: data[i][9]==null?(null):(data[i][9]+"")}//{redBillMoney,billMoney}
            list[8] = data[i][4].split(",")//redBillNo
            list[9] = status//status
            lists[i]=list
        }
    }
    return lists;
}

function addLargeInteger(arg) {
    var res = largeIntegerAddition.apply(this, arg);
    return res
}

function doubleDown(soure){
    if(soure.length==2){
        return "0."+soure
    }else if(soure.length==1){
        return "0.0"+soure
    }
    var index = soure.length-2;
    return soure.slice(0, index) + "." + soure.slice(index);
}

function removeFile(file){
    eventHub.emit('removeFile', file, null);
}

function valueToHtml(str){
    return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}