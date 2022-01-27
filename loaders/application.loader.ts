//import dependencies
import express from "express";
import cors from "cors";
import helmet from "helmet";

//import configs
import configs from "../.configs";

export default class Application {
  private _application;

  constructor() {
    let application = express();
    this._application = this.setApplication(application);

    //listening on port
    application.listen(configs.port);
  }

  public getApplication() {
    return this._application;
  }

  private setApplication(application: express.Application) {
    //Initializing helmet
    application.use(helmet.dnsPrefetchControl());
    application.use(helmet.expectCt());
    application.use(helmet.frameguard());
    application.use(helmet.hidePoweredBy());
    application.use(helmet.hsts());
    application.use(helmet.ieNoOpen());
    application.use(helmet.noSniff());
    application.use(helmet.originAgentCluster());
    application.use(helmet.permittedCrossDomainPolicies());
    application.use(helmet.referrerPolicy());
    application.use(helmet.xssFilter());

    //Initializing express body parser
    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));

    //setting app CORS policy
    application.use(cors());

    //setting _application
    return application;
  }
}
