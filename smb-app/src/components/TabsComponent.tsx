
import * as React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { elementsTabs } from './utils'
import { makeStyles } from "@material-ui/core/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Props {
  listItem: elementsTabs[]
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={8}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles({
  tab: {
    float: 'right'
  }
});

export const TabsComponent: React.FC<Props> = ({ listItem }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs className={classes.tab} value={value} onChange={handleChange} aria-label="basic tabs example"
        textColor="inherit" indicatorColor="primary" >
        {listItem.map((item) => {

          return (
            <Tab label={item.name} key={item.name} {...a11yProps(listItem.indexOf(item))} />
          )
        })}
      </Tabs>
      {listItem.map((item) => {
        return (
          <TabPanel key={item.name} value={value} index={listItem.indexOf(item)}>
            {item.link}
          </TabPanel>

        )

      })}
    </>

  )
}