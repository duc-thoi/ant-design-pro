import {
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import {
  Alert,
  Button,
  Card,
  Collapse,
  Descriptions,
  Divider,
  Form,
  Result,
  Statistic,
} from 'antd';
import React, { useState } from 'react';
import type { StepDataType } from './data.d';
import useStyles from './style.style';

const STEP_TITLES = [
  'Enter Transfer Info',
  'Confirm Transfer Info',
  'Complete',
];

const FAQ_TEXT =
  'If needed, you can put some FAQs about the product here. If needed, you can put some FAQs about the product here. If needed, you can put some FAQs about the product here.';

const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  const items = [
    { key: 'payAccount', label: 'Payment Account', children: payAccount },
    {
      key: 'receiverAccount',
      label: 'Recipient Account',
      children: receiverAccount,
    },
    { key: 'receiverName', label: 'Recipient Name', children: receiverName },
    {
      key: 'amount',
      label: 'Transfer Amount',
      children: (
        <Statistic
          value={amount}
          suffix={<span style={{ fontSize: 14 }}>CNY</span>}
          precision={2}
        />
      ),
    },
  ];
  return <Descriptions column={1} bordered={bordered} items={items} />;
};
const StepResult: React.FC<{
  onFinish: () => Promise<void>;
  children?: React.ReactNode;
}> = (props) => {
  const { styles } = useStyles();
  return (
    <Result
      status="success"
      title="Transfer Successful"
      subTitle="Expected to arrive within two hours"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            Make Another Transfer
          </Button>
          <Button>View Bill</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};
const InlineFaq: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Collapse
      size="small"
      className={styles.faq}
      items={[
        {
          key: 'faq',
          label: 'Instructions',
          children: (
            <div className={styles.faqList}>
              <div>
                <h4 className={styles.faqHeading}>
                  Transfer to an Alipay account
                </h4>
                <p className={styles.faqText}>{FAQ_TEXT}</p>
              </div>
              <div>
                <h4 className={styles.faqHeading}>Transfer to a bank card</h4>
                <p className={styles.faqText}>{FAQ_TEXT}</p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};
const StepForm: React.FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<StepDataType>();
  return (
    <PageContainer content="Split a long or unfamiliar form task into multiple steps to guide the user through it.">
      <Card variant="borderless">
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          stepsProps={{ orientation: 'vertical' }}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
          layoutRender={({ stepsDom, formDom }) => (
            <div className={styles.layout}>
              <nav aria-label="Steps" className={styles.rail}>
                <div className={styles.railInner}>{stepsDom}</div>
              </nav>
              <section
                aria-labelledby="step-form-heading"
                className={styles.panel}
              >
                <header className={styles.panelHeader}>
                  <div className={styles.stepCount}>
                    {current + 1} / {STEP_TITLES.length}
                  </div>
                  <h2 id="step-form-heading" className={styles.stepHeading}>
                    {STEP_TITLES[current]}
                  </h2>
                </header>
                <div className={styles.panelBody}>{formDom}</div>
              </section>
            </div>
          )}
        >
          <StepsForm.StepForm<StepDataType>
            formRef={{
              current: form,
            }}
            title="Enter Transfer Info"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="Payment Account"
              width="md"
              name="payAccount"
              rules={[
                {
                  required: true,
                  message: 'Please select a payment account',
                },
              ]}
              valueEnum={{
                'ant-design@alipay.com': 'ant-design@alipay.com',
              }}
            />

            <ProForm.Group title="Recipient Account" size={8}>
              <ProFormSelect
                name="receiverMode"
                rules={[
                  {
                    required: true,
                    message: 'Please select a payment account',
                  },
                ]}
                valueEnum={{
                  alipay: 'Alipay',
                  bank: 'Bank Account',
                }}
              />
              <ProFormText
                name="receiverAccount"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the recipient account',
                  },
                  {
                    type: 'email',
                    message: 'Account name must be an email address',
                  },
                ]}
                placeholder="test@example.com"
              />
            </ProForm.Group>
            <InlineFaq />
            <ProFormText
              label="Recipient Name"
              width="md"
              name="receiverName"
              rules={[
                {
                  required: true,
                  message: 'Please enter the recipient name',
                },
              ]}
              placeholder="Please enter the recipient name"
            />
            <ProFormDigit
              label="Transfer Amount"
              name="amount"
              width="md"
              rules={[
                {
                  required: true,
                  message: 'Please enter the transfer amount',
                },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'Please enter a valid amount',
                },
              ]}
              placeholder="Please enter an amount"
              fieldProps={{
                prefix: '￥',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="Confirm Transfer Info">
            <Alert
              closable
              showIcon
              title="Once the transfer is confirmed, the funds will go directly to the recipient's account and cannot be returned."
              style={{
                marginBottom: 24,
              }}
            />
            <StepDescriptions stepData={stepData} bordered />
            <Divider
              style={{
                margin: '24px 0',
              }}
            />
            <ProFormText.Password
              label="Payment Password"
              width="md"
              name="password"
              required={false}
              rules={[
                {
                  required: true,
                  message: 'A payment password is required to make the payment',
                },
              ]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Complete">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                form.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
      </Card>
    </PageContainer>
  );
};
export default StepForm;
