import * as ReactDOM from "react-dom";
import * as React from "react";
import { SampleBase } from "../common/sample-base";
import {
  SplitterComponent,
  PaneDirective,
  PanesDirective
} from "@syncfusion/ej2-react-layouts";
import { Ajax } from "@syncfusion/ej2-base";
import { ListViewComponent } from "@syncfusion/ej2-react-lists";
import {
  ExpandEventArgs,
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective
} from "@syncfusion/ej2-react-navigations";
import "./accordion-navigation-menu.component.css";

// Splitter sample with accordion integration

export class AccordionIntegration extends SampleBase<{}, {}> {
  private items: [
    {
      header: "ASP.NET";
      expanded: true;
      content: '<div id="nested_Acc1"></div>';
    },
    { header: "ASP.NET MVC"; content: '<div id="nested_Acc2"></div>' },
    { header: "JavaScript"; content: '<div id="nested_Acc3"></div>' }
  ];
  private splitterInstance: SplitterComponent;
  private accordionInstance: AccordionComponent;
  private beforeBegin(): void {
    let list2: HTMLElement = document.querySelector("#split-list2");
    let list3: HTMLElement = document.querySelector("#split-list3");
    list2.style.display = "none";
    list3.style.display = "none";
  }
  private onCreate(e: any): void {
    let cont: HTMLElement = this.splitterInstance.element.querySelector(
      ".e-pane"
    );
    cont.appendChild(this.accordionInstance.element);
  }

  private ListData1: { [key: string]: Object }[] = [
    { text: "Grid", id: "1" },
    { text: "Schedule", id: "2" },
    { text: "Chart", id: "7" }
  ];
  private ListData2: { [key: string]: Object }[] = [
    { text: "Grid", id: "3" },
    { text: "Schedule", id: "4" },
    { text: "Chart", id: "8" }
  ];
  private ListData3: { [key: string]: Object }[] = [
    { text: "Grid", id: "5" },
    { text: "Schedule", id: "6" },
    { text: "Chart", id: "9" }
  ];

  private expand(e: ExpandEventArgs): void {
    if (e.isExpanded && [].indexOf.call(this.items, e.item) === 0) {
      if (e.element.querySelectorAll(".e-list-parent").length > 0) {
        return;
      }
    }
    if (e.isExpanded && [].indexOf.call(this.items, e.item) === 1) {
      if (e.element.querySelectorAll(".e-list-parent").length > 0) {
        return;
      }
    }
    if (e.isExpanded && [].indexOf.call(this.items, e.item) === 2) {
      if (e.element.querySelectorAll(".e-list-parent").length > 0) {
        return;
      }
    }
  }
  private onSelect(e: any): void {
    let listid: string = e.item.dataset.uid;
    switch (listid) {
      case "1":
        let ajax: Ajax = new Ajax(
          "./src/splitter/aspnet-grid-ajax.html",
          "GET",
          true
        );
        ajax.send().then();
        ajax.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "2":
        let ajax1: Ajax = new Ajax(
          "./src/splitter/aspnet-schedule-ajax.html",
          "GET",
          true
        );
        ajax1.send().then();
        ajax1.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "3":
        let ajax2: Ajax = new Ajax(
          "./src/splitter/aspnetmvc-grid-ajax.html",
          "GET",
          true
        );
        ajax2.send().then();
        ajax2.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "4":
        let ajax3: Ajax = new Ajax(
          "./src/splitter/aspnetmvc-schedule-ajax.html",
          "GET",
          true
        );
        ajax3.send().then();
        ajax3.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "5":
        let ajax4: Ajax = new Ajax(
          "./src/splitter/javascript-grid-ajax.html",
          "GET",
          true
        );
        ajax4.send().then();
        ajax4.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "6":
        let ajax5: Ajax = new Ajax(
          "./src/splitter/javascript-schedule-ajax.html",
          "GET",
          true
        );
        ajax5.send().then();
        ajax5.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "7":
        let ajax6: Ajax = new Ajax(
          "./src/splitter/aspnet-chart-ajax.html",
          "GET",
          true
        );
        ajax6.send().then();
        ajax6.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "8":
        let ajax7: Ajax = new Ajax(
          "./src/splitter/aspnetmvc-chart-ajax.html",
          "GET",
          true
        );
        ajax7.send().then();
        ajax7.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "9":
        let ajax8: Ajax = new Ajax(
          "./src/splitter/javascript-chart-ajax.html",
          "GET",
          true
        );
        ajax8.send().then();
        ajax8.onSuccess = (data: any) => {
          this.splitterInstance.paneSettings[1].content = data;
        };
        break;
    }
  }

  private expanding(e: ExpandEventArgs): void {
    let index: number = e.index;
    switch (index) {
      case 0:
        this.splitterInstance.paneSettings[1].content =
          "<div class = 'accordion-splitter-content'><h4>About ASP.NET</h4>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface.</div>";
        break;
      case 1:
        this.splitterInstance.paneSettings[1].content =
          "<div class = 'accordion-splitter-content'> <h4>About ASP.NET MVC</h4>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications. The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages.</div>";
        break;
      case 2:
        this.splitterInstance.paneSettings[1].content =
          "<div class = 'accordion-splitter-content'> <h4>About JavaScript</h4>JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications.</div>";
        break;
    }
  }

  public render(): JSX.Element {
    return (
      <div id="accordionSplitter" className="control-section">
        {/* ListView element */}
        <div id="list_wrapper">
          <ListViewComponent
            id="split-list1"
            actionBegin={this.beforeBegin}
            dataSource={this.ListData1}
            select={this.onSelect.bind(this)}
          />
          <ListViewComponent
            id="split-list2"
            dataSource={this.ListData2}
            select={this.onSelect.bind(this)}
          />
          <ListViewComponent
            id="split-list3"
            dataSource={this.ListData3}
            select={this.onSelect.bind(this)}
          />
          <AccordionComponent
            id="split_pane1"
            ref={accordion => (this.accordionInstance = accordion)}
            expanding={this.expanding.bind(this)}
            expanded={this.expand.bind(this)}
          >
            <AccordionItemsDirective>
              <AccordionItemDirective
                header={"ASP.NET"}
                content={"#split-list1"}
                expanded={true}
              />
              <AccordionItemDirective
                header={"ASP.NET MVC"}
                content={"#split-list2"}
              />
              <AccordionItemDirective
                header={"JavaScript"}
                content={"#split-list3"}
              />
            </AccordionItemsDirective>
          </AccordionComponent>
        </div>
        <div id="splitter-01" className="splitter-custom">
          <SplitterComponent
            height="288px"
            width="100%"
            ref={splitter => (this.splitterInstance = splitter)}
            created={this.onCreate.bind(this)}
          >
            <PanesDirective>
              <PaneDirective size={"35%"} min={"30%"} />
              <PaneDirective size={"65%"} min={"45%"} />
            </PanesDirective>
          </SplitterComponent>
        </div>
        <div id="action-description">
          <p>
            This example demonstrates the Accordion control that can be
            integrated within the split pane. Select the product from the left
            pane to display the corresponding product details on the right pane.
          </p>
        </div>
        <div id="description">
          <p>
            The Splitter is the layout user interface (UI) control and allows
            integrating other JavaScript UI controls within its pane. In this
            sample, the Splitter control is used to design navigation menu-like
            application using JavaScript Accordion control. The Accordion
            control is integrated within left pane to display the product menu
            and selected product details on right pane.
          </p>
        </div>
      </div>
    );
  }
}
