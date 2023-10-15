import React from "react";
import Dragula from "dragula";
import "dragula/dist/dragula.css";
import Swimlane from "./Swimlane";
import "./Board.css";
import Card from "./Card";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: {
        backlog: [],
        inProgress: [],
        complete: [],
      },
    };

    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };
  }

  componentDidMount() {
    this.dragula = Dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current,
    ]);

    this.dragula.on("drop", (el, target) => {
      const cardId = el.getAttribute("data-id");
      const status = target.getAttribute("data-status");
      this.updateCardStatus(cardId, status);
    });

    const clients = this.getClients();
    this.setState({
      clients: {
        backlog: clients,
        inProgress: [],
        complete: [],
      },
    });
  }
  getClients() {
    return [
      [
        "1",
        "Stark, White and Abbott",
        "Cloned Optimal Architecture",
        "backlog",
      ],
      [
        "2",
        "Wiza LLC",
        "Exclusive Bandwidth-Monitored Implementation",
        "backlog",
      ],
      [
        "3",
        "Nolan LLC",
        "Vision-Oriented 4Thgeneration Graphicaluserinterface",
        "backlog",
      ],
      ["4", "Thompson PLC", "Streamlined Regional Knowledgeuser", "backlog"],
      [
        "5",
        "Walker-Williamson",
        "Team-Oriented 6Thgeneration Matrix",
        "backlog",
      ],
      ["6", "Boehm and Sons", "Automated Systematic Paradigm", "backlog"],
      [
        "7",
        "Runolfsson, Hegmann and Block",
        "Integrated Transitional Strategy",
        "backlog",
      ],
      ["8", "Schumm-Labadie", "Operative Heuristic Challenge", "backlog"],
      [
        "9",
        "Kohler Group",
        "Re-Contextualized Multi-Tasking Attitude",
        "backlog",
      ],
      ["10", "Romaguera Inc", "Managed Foreground Toolset", "backlog"],
      ["11", "Reilly-King", "Future-Proofed Interactive Toolset", "backlog"],
      [
        "12",
        "Emard, Champlin and Runolfsdottir",
        "Devolved Needs-Based Capability",
        "backlog",
      ],
      [
        "13",
        "Fritsch, Cronin and Wolff",
        "Open-Source 3Rdgeneration Website",
        "backlog",
      ],
      [
        "14",
        "Borer LLC",
        "Profit-Focused Incremental Orchestration",
        "backlog",
      ],
      ["15", "Emmerich-Ankunding", "User-Centric Stable Extranet", "backlog"],
      [
        "16",
        "Willms-Abbott",
        "Progressive Bandwidth-Monitored Access",
        "backlog",
      ],
      ["17", "Brekke PLC", "Intuitive User-Facing Customerloyalty", "backlog"],
      [
        "18",
        "Bins, Toy and Klocko",
        "Integrated Assymetric Software",
        "backlog",
      ],
      [
        "19",
        "Hodkiewicz-Hayes",
        "Programmable Systematic Securedline",
        "backlog",
      ],
      ["20", "Murphy, Lang and Ferry", "Organized Explicit Access", "backlog"],
    ].map((companyDetails) => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }

  updateCardStatus(cardId, status) {
    this.setState((prevState) => {
      const updatedClients = { ...prevState.clients };

      Object.keys(updatedClients).forEach((swimlane) => {
        updatedClients[swimlane] = updatedClients[swimlane].filter((client) => {
          if (client.id === cardId) {
            client.status = status;
          }
          return client;
        });
      });

      return { clients: updatedClients };
    });
  }

  renderSwimlane(name, clients, ref, status) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref} status={status}>
        {clients.map((client) => (
          <Card
            key={client.id}
            id={client.id}
            name={client.name}
            status={client.status}
            description={client.description}
          />
          // <div
          //   key={client.id}
          //   className={`Card ${
          //     client.status === "backlog"
          //       ? "Card-grey"
          //       : client.status === "inProgress"
          //       ? "Card-blue"
          //       : "Card-green"
          //   }`}
          //   data-id={client.id}
          // >
          //   <div className="Card-title">{client.name}</div>
          //   <div>{client.description}</div>
          // </div>
        ))}
      </Swimlane>
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane(
                "Backlog",
                this.state.clients.backlog,
                this.swimlanes.backlog
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "In Progress",
                this.state.clients.inProgress,
                this.swimlanes.inProgress
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "Complete",
                this.state.clients.complete,
                this.swimlanes.complete
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
