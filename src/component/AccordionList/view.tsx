import React from 'react';
import { AccordionList, AccordionItem } from './index';

export interface SampleAccordionProps {
  /** 아코디언 id */
  accordionId: string;
  /** 아코디언 전체 확장 여부 */
  isAllExpanded?: boolean;
  /** 확장할 아코디언 인덱스 */
  initialIndex?: number;
}

const SampleAccordion = ({
  accordionId,
  isAllExpanded = false,
  initialIndex
}: SampleAccordionProps) => {
  return (
    <AccordionList
      accordionId={accordionId}
      initialIndex={initialIndex}
      isAllExpanded={isAllExpanded}
    >
      <AccordionItem headerLabel="Accordion 1">
        <p style={{ padding: '20px' }}>Accordion Panel 1</p>
      </AccordionItem>
      <AccordionItem headerLabel="Accordion 2">
        <p style={{ padding: '20px' }}>Accordion Panel 2</p>
      </AccordionItem>
      <AccordionItem headerLabel="Accordion 3">
        <p style={{ padding: '20px' }}>Accordion Panel 3</p>
      </AccordionItem>
    </AccordionList>
  );
};

export default SampleAccordion;
