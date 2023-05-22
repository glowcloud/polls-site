import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";

const BarChart = ({ data, layout }) => {
  return (
    <Box
      height={700 + data.length * 5}
      px={{ xs: 1, md: 5, lg: 15, xl: 10 }}
      mt={5}
    >
      <ResponsiveBar
        data={data}
        keys={["value"]}
        layout={layout}
        indexBy="id"
        margin={{ top: 50, right: 50, bottom: 200 + data.length * 5, left: 50 }}
        padding={0.3}
        colorBy="indexValue"
        axisBottom={{
          format: (e) =>
            typeof e === "string" || Math.floor(e) === e ? e : "",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: layout === "vertical" ? "" : "votes",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          format: (e) =>
            (typeof e === "string" || Math.floor(e) === e) &&
            layout === "vertical"
              ? e
              : "",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: layout === "horizontal" ? "" : "votes",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        legends={[
          {
            dataFrom: "indexes",
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 160,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default BarChart;
