import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function Chart({data}) {
  return (
    <ResponsiveContainer height={326}>
      <LineChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      className="bg-dark"
    >
      <CartesianGrid />
      <XAxis dataKey="name" stroke="#ddd" />
      <YAxis stroke="#ddd" />
      <Tooltip />
      <Legend />
      <Line
        type="natural"
        dataKey="test2"
        stroke="#59674D"
        activeDot={{ r: 8 }}
        dot={{ fill: "#59674D", strokeWidth: 2 }}
      />
        <Line
          type="natural"
          dataKey="test3"
          stroke="#2D485A"
          activeDot={{ r: 8 }}
          dot={{ fill: "#2D485A", strokeWidth: 2 }}
        />
        <Line
          type="natural"
          dataKey="test1"
          activeDot={{ r: 8 }}
          stroke="#6F5252"
          dot={{ fill: "#6F5252", strokeWidth: 2 }}
        />
        <Line
          type="natural"
          dataKey="test4"
          activeDot={{ r: 8 }}
          stroke="#335431"
          dot={{ fill: "#335431", strokeWidth: 2 }}
        />
        <Line
          type="natural"
          dataKey="test5"
          activeDot={{ r: 8 }}
          stroke="#566268"
          dot={{ fill: "#566268", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
    
  );
}

export default Chart;