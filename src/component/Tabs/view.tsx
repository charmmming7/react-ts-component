import React from 'react';
import { Tabs, TabPanel } from './index';

export interface SampleTabProps {
  /** 탭 id */
  tabsId: string;
  /** 선택된 탭 인덱스 */
  initialIndex?: number;
  /** 탭 아이템 데이터 */
  tabLabelList: string[];
}

const SampleTab = ({
  tabsId,
  initialIndex = 0,
  tabLabelList
}: SampleTabProps) => {
  return (
    <>
      <Tabs
        tabsId={tabsId}
        initialIndex={initialIndex}
        tabLabelList={tabLabelList}
      >
        <TabPanel tabsId={tabsId} index={0}>
          Tab Panel 1
        </TabPanel>

        <TabPanel tabsId={tabsId} index={1}>
          Tab Panel 2
        </TabPanel>

        <TabPanel tabsId={tabsId} index={2}>
          Tab Panel 3
        </TabPanel>
      </Tabs>
    </>
  );
};

export default SampleTab;
