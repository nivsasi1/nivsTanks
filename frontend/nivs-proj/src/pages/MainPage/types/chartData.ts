export type verticalData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
  }[];
};

export type doughnutData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

export type tank = {
  carNumber: String,
  makat: String,
  kshirot: Boolean,
  gdud: String,
}