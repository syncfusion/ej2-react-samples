import * as ReactDOM from "react-dom";
import * as React from "react";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import {
  SplitterComponent,
  PaneDirective,
  PanesDirective
} from "@syncfusion/ej2-react-layouts";
import { Ajax } from "@syncfusion/ej2-base";
import { ListViewComponent, SelectEventArgs } from "@syncfusion/ej2-react-lists";
import {
  ExpandEventArgs,
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective
} from "@syncfusion/ej2-react-navigations";
import "./accordion-navigation-menu.component.css";

// Splitter sample with accordion integration

function AccordionIntegration(){
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let items: [
    {
      header: "ASP.NET";
      expanded: true;
      content: '<div id="nested_Acc1"></div>';
    },
    { header: "ASP.NET MVC"; content: '<div id="nested_Acc2"></div>' },
    { header: "JavaScript"; content: '<div id="nested_Acc3"></div>' }
  ];
  let splitterInstance: SplitterComponent;
  let accordionInstance: AccordionComponent;


  let ListData1: { [key: string]: Object }[] = [
    { text: "Grid", id: "1" },
    { text: "Schedule", id: "2" },
    { text: "Chart", id: "7" }
  ];
  let ListData2: { [key: string]: Object }[] = [
    { text: "Grid", id: "3" },
    { text: "Schedule", id: "4" },
    { text: "Chart", id: "8" }
  ];
  let ListData3: { [key: string]: Object }[] = [
    { text: "Grid", id: "5" },
    { text: "Schedule", id: "6" },
    { text: "Chart", id: "9" }
  ];

  function expand(e: ExpandEventArgs): void {
    if (e.isExpanded && [].indexOf.call(items, e.item) === 0) {
      if (e.element.querySelectorAll(".e-list-parent").length > 0) {
        return;
      }
    }
    if (e.isExpanded && [].indexOf.call(items, e.item) === 1) {
      if (e.element.querySelectorAll(".e-list-parent").length > 0) {
        return;
      }
    }
    if (e.isExpanded && [].indexOf.call(items, e.item) === 2) {
      if (e.element.querySelectorAll(".e-list-parent").length > 0) {
        return;
      }
    }
  }
  function onSelect(e: SelectEventArgs): void {
    let listid: string = (e.item as HTMLElement).dataset.uid;
    switch (listid) {
      case "1":
        let ajax: Ajax = new Ajax(
          "./src/splitter/aspnet-grid-ajax.html",
          "GET",
          true
        );
        ajax.send().then();
        ajax.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "2":
        let ajax1: Ajax = new Ajax(
          "./src/splitter/aspnet-schedule-ajax.html",
          "GET",
          true
        );
        ajax1.send().then();
        ajax1.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "3":
        let ajax2: Ajax = new Ajax(
          "./src/splitter/aspnetmvc-grid-ajax.html",
          "GET",
          true
        );
        ajax2.send().then();
        ajax2.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "4":
        let ajax3: Ajax = new Ajax(
          "./src/splitter/aspnetmvc-schedule-ajax.html",
          "GET",
          true
        );
        ajax3.send().then();
        ajax3.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "5":
        let ajax4: Ajax = new Ajax(
          "./src/splitter/javascript-grid-ajax.html",
          "GET",
          true
        );
        ajax4.send().then();
        ajax4.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "6":
        let ajax5: Ajax = new Ajax(
          "./src/splitter/javascript-schedule-ajax.html",
          "GET",
          true
        );
        ajax5.send().then();
        ajax5.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "7":
        let ajax6: Ajax = new Ajax(
          "./src/splitter/aspnet-chart-ajax.html",
          "GET",
          true
        );
        ajax6.send().then();
        ajax6.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "8":
        let ajax7: Ajax = new Ajax(
          "./src/splitter/aspnetmvc-chart-ajax.html",
          "GET",
          true
        );
        ajax7.send().then();
        ajax7.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
      case "9":
        let ajax8: Ajax = new Ajax(
          "./src/splitter/javascript-chart-ajax.html",
          "GET",
          true
        );
        ajax8.send().then();
        ajax8.onSuccess = (data: string | HTMLElement) => {
          splitterInstance.paneSettings[1].content = data;
        };
        break;
    }
  }

  function expanding(e: ExpandEventArgs): void {
    let index: number = e.index;
    switch (index) {
      case 0:
        splitterInstance.paneSettings[1].content =
          "<div class = 'accordion-splitter-content'><h4>About ASP.NET</h4>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface.</div>";
        break;
      case 1:
        splitterInstance.paneSettings[1].content =
          "<div class = 'accordion-splitter-content'> <h4>About ASP.NET MVC</h4>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications. The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages.</div>";
        break;
      case 2:
        splitterInstance.paneSettings[1].content =
          "<div class = 'accordion-splitter-content'> <h4>About JavaScript</h4>JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications.</div>";
        break;
    }
  }

  function accordionElement(): JSX.Element {
    return (
      <AccordionComponent
            id="split_pane1"
            ref={accordion => (accordionInstance = accordion)}
            expanding={expanding.bind(this)}
            expanded={expand.bind(this)}
          >
            <AccordionItemsDirective>
              <AccordionItemDirective
                header={"ASP.NET"}
                content={splitlist1.bind(this)}
                expanded={true}
              />
              <AccordionItemDirective
                header={"ASP.NET MVC"}
                content={splitlist2.bind(this)}
              />
              <AccordionItemDirective
                header={"JavaScript"}
                content={splitlist3.bind(this)}
              />
            </AccordionItemsDirective>
          </AccordionComponent>
    );
  };

  function splitlist1(): JSX.Element {
    return (
      <ListViewComponent
      id="split-list1"
      dataSource={ListData1}
      select={onSelect.bind(this)}
    />
      );
  };

  function splitlist2(): JSX.Element {
    return (
      <ListViewComponent
      id="split-list2"
      dataSource={ListData2}
      select={onSelect.bind(this)}
    />
      );
  };

  function splitlist3(): JSX.Element {
    return (
      <ListViewComponent
      id="split-list3"
      dataSource={ListData3}
      select={onSelect.bind(this)}
    />   
      );
  };

    return (
      <div id="accordionSplitter" className="control-section">
        <div id="splitter-01" className="splitter-custom">
          <SplitterComponent
            height="288px"
            width="100%"
            ref={splitter => (splitterInstance = splitter)}
          >
            <PanesDirective>
              <PaneDirective size={"35%"} min={"30%"} content={accordionElement.bind(this)} />
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
export default AccordionIntegration;
