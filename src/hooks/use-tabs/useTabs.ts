import {useState} from 'react';
import {Tab} from '../../components/tabs/tabs';

export const useTabs = () => {
  const [activeTab, setActiveTab] = useState<string>(Tab.Characteristics);

  const tabClickHandler = (tabName:string) => {
    setActiveTab(tabName);
  };

  return{ activeTab, tabClickHandler};
};
