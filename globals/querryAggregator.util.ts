//importing depandences
import mongoose from "mongoose";

//importing interfaces
import { QuerryOptions } from "./express";

export default function querryAggregator(options: QuerryOptions) {
  //declaration spot
  let stages = [];
  let filters = options.filter;

  stages.push({
    $match: filters,
  });

  if (options.select) {
    stages.push({
      $project: options.select,
    });
  }

  stages.push({
    $sort: options.sort,
  });

  stages.push({
    $skip: options.limit * (options.currentPage - 1),
  });

  stages.push({
    $limit: options.limit,
  });

  return stages;
}
