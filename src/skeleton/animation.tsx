import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SkeletonComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './animation.css';
export class Animation extends SampleBase<{}, { [key: string]: any }> {

    constructor(props) {
        super(props);
        this.state = { isDataLoading: true, profileimage: "image e-avatar", postimage: "image", cardname: "", cardtime: "", listData: [] };
    }

    public fields: object = { text: 'text' };

    public getData() {
        return new Promise(resolve => setTimeout(() => {
            let data: { [key: string]: Object } = {};
            data['listdata'] = [
                { text: "Jenifer", contact: "(206) 555-985774", id: "1", avatar: "", pic: "pic01" },
                { text: "Amenda", contact: "(206) 555-3412", id: "2", avatar: "A", pic: "" },
                { text: "Isabella", contact: "(206) 555-8122", id: "4", avatar: "", pic: "pic02" },
                { text: "William ", contact: "(206) 555-9482", id: "5", avatar: "W", pic: "" },
                { text: "Jacob", contact: "(71) 555-4848", id: "6", avatar: "", pic: "pic04" },
                { text: "Matthew", contact: "(71) 555-7773", id: "7", avatar: "M", pic: "" },
                { text: "Oliver", contact: "(71) 555-5598", id: "8", avatar: "", pic: "pic03" },
                { text: "Charlotte", contact: "(206) 555-1189", id: "9", avatar: "C", pic: "" },
            ];
            data['profImage'] = "image profile-image e-avatar";
            data['postImage'] = "image post-image";
            data['cardName'] = "Laura Callahan";
            data['cardTime'] = new Date().toLocaleString();
            resolve(data);
        }, 3000));
    }

    public loadData() {
        this.getData().then((data: { [key: string]: any }) => {
            this.setState({ profileimage: data.profImage, postimage: data.postImage, cardname: data.cardName, cardtime: data.cardTime, isDataLoading: false, listData: data.listdata });
        });
    }

    // Reload button click event handler.
    public reload() {
        // if (!this.state.isDataLoading) {
        this.setState({ profileimage: "image  e-avatar", postimage: "image", cardname: "", cardtime: "", isDataLoading: true, listData: [] });
        this.loadData();
        // }
    };

    listTemplate(data) {
        let letterAvatar = <span className='e-avatar e-avatar-circle'>{data.avatar}</span>;
        let imageAvatar = <span className={`${data.pic} e-avatar e-avatar-circle`}></span>;
        return (<div className='e-list-wrapper e-list-multi-line e-list-avatar'>
            {data.avatar !== "" ? (letterAvatar) : (imageAvatar)}
            <span className="e-list-item-header">{data.text}</span>
            <span className="e-list-content">{data.contact}</span>
        </div>);
    }
    componentDidMount(): void {
        this.loadData();
    }

    render() {
        let fade;
        let pulse;
        if (this.state.isDataLoading) {
            fade = (
                <div id="skeletonCard" className="e-card">
                    <div className="cardProfile">
                        <SkeletonComponent shape='Circle' width='60px' height='60px' shimmerEffect='Fade'></SkeletonComponent>
                    </div>
                    <div className="cardinfo">
                        <SkeletonComponent width='30%' height='15px' shimmerEffect='Fade'></SkeletonComponent><br />
                        <SkeletonComponent width='15%' height='15px' shimmerEffect='Fade'></SkeletonComponent><br />
                    </div>
                    <div className="cardContent">
                        <SkeletonComponent shape='Rectangle' width='100%' height='250px' shimmerEffect='Fade'></SkeletonComponent>
                    </div>
                    <div className="cardoptions">
                        <SkeletonComponent shape='Rectangle' width='20%' height='30px' shimmerEffect='Fade'></SkeletonComponent>
                        <SkeletonComponent shape='Rectangle' width='20%' height='30px' shimmerEffect='Fade'></SkeletonComponent>
                    </div>
                </div>);
            pulse = (
                <ul id="skeleton-list" className="e-card">
                    {Array.from({ length: 8 }, function (_, index) {
                        return (<li key={index}>
                            <SkeletonComponent shape='Circle' width='60px' shimmerEffect='Pulse'></SkeletonComponent>
                            <div>
                                <SkeletonComponent width='80%' height='10px' shimmerEffect='Pulse'></SkeletonComponent><br />
                                <SkeletonComponent width='60%' height='15px' shimmerEffect='Pulse'></SkeletonComponent>
                            </div>
                        </li>);
                    })}
                </ul>);
        }
        else {
            fade = (
                <div id="skeletondatacard" className="e-card">
                    <div className="cardProfile">
                        <div className={this.state.profileimage}></div>
                    </div>
                    <div className="cardinfo">
                        <label id="name" style={{ fontSize: "15px" }}>{this.state.cardname}</label><br />
                        <label id="time" style={{ fontWeight: "normal" }}>{this.state.cardTime}</label>
                    </div>
                    <div className="cardContent">
                        <div className={this.state.postimage}></div>
                    </div >
                    <div className="cardoptions">
                        <div id="cardLeftOptn" style={{ width: "20%" }}>
                            <button className="e-btn e-outline e-primary" style={{ width: "100%" }}>Like</button>
                        </div>
                        <div id="cardRightOptn" style={{ width: "20%" }}>
                            <button className="e-btn e-primary" style={{ width: "100%" }}>Share</button>
                        </div>
                    </div>
                </div >
            );
            pulse = (
                <ListViewComponent id='skeleton-listview' dataSource={this.state.listData} sortOrder="Ascending" height='420px' template={this.listTemplate} fields={this.fields} cssClass='e-list-template e-card'></ListViewComponent>
            );
        }
        return (
            <div className="control-section">
                <div className="row skeleton-animation">
                    <div>
                        <button id="reloadSkeleton" className="e-btn e-primary" onClick={this.reload.bind(this)}>Reload</button>
                    </div>
                    <div className="col-sm-6">
                        <h5>Fade Effect</h5>
                        <br />
                        {fade}
                    </div>
                    <div className="col-sm-6">
                        <h5>Pulse Effect</h5>
                        <br />
                        {pulse}
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the fade and pulse shimmer effects of the skeleton with a card and a list layout. Click the reload button to load data to the card and list with a skeleton to show loading.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The default skeleton shimmer effect is wave. This can be changed to <b>Fade</b> and <b>Pulse</b> shimmer effects using the <code>shimmerEffect</code> property.
                    </p>
                </div>
            </div>
        );
    }

}


