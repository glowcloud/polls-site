import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";

const PieChart = ({ data, smallScreen }) => {
  return (
    <Box height={700 + data.length * 5}>
      <ResponsivePie
        height={700 + data.length * 5}
        data={data}
        margin={{
          top: 30,
          right: smallScreen ? 10 : 80,
          bottom: 30,
          left: smallScreen ? 10 : 80,
        }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!smallScreen}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
      />
    </Box>
  );
};

export default PieChart;
