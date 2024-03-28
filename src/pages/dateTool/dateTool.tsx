import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
  RadioGroup,
  HStack,
  Radio,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { zonedTimeToUtc } from "date-fns-tz";
import { AddIcon, CopyIcon } from "@chakra-ui/icons";
import { yupDate, yupTime } from "../../forms/validation";

interface FormValues {
  date: string;
  time: string;
  timeType: "startOfDay" | "endOfDay" | "custom";
}

interface DateData {
  dateTime: string;
  asMilis: number;
}

const timezone = "America/New_York";

const initialValues: FormValues = {
  date: "",
  time: "00:00:00",
  timeType: "startOfDay",
};

const validationSchema = Yup.object({
  date: yupDate.required("Date is required"),
  time: yupTime.required("Time is required"),
});

export function DateTool() {
  const [dateData, setDateData] = useLocalStorage<DateData[]>("dateData", []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const dateTime = `${values.date}T${values.time}`;
      const newDate = { dateTime, asMilis: zonedTimeToUtc(dateTime, timezone).getTime() };
      const newDates = [newDate, ...dateData];

      if (newDates.length > 20) {
        newDates.pop();
      }

      setDateData(newDates);
    },
  });

  const toast = useToast();

  return (
    <Box justifyContent="center" alignItems="center" display="flex" height="100%" padding={8}>
      <form onSubmit={formik.handleSubmit}>
        <VStack gap={8}>
          <VStack gap={2} alignItems={"stretch"}>
            <Text fontSize="lg">Date:</Text>
            <Input id="date" name="date" type="date" value={formik.values.date} onChange={formik.handleChange} />

            <Text fontSize="lg">Time:</Text>

            <RadioGroup
              id="timeType"
              name="timeType"
              onChange={(value) => {
                formik.setFieldValue("timeType", value);

                if (value === "startOfDay") {
                  formik.setFieldValue("time", "00:00:00");
                } else if (value === "endOfDay") {
                  formik.setFieldValue("time", "23:59:59");
                }
              }}
              value={formik.values.timeType}
            >
              <HStack>
                <Radio value="startOfDay">Start of Day</Radio>
                <Radio value="endOfDay">End of Day</Radio>
                <Radio value="custom">Custom</Radio>
              </HStack>
            </RadioGroup>

            <Input
              id="time"
              name="time"
              type="time"
              step="1"
              value={formik.values.time}
              onChange={formik.handleChange}
              disabled={formik.values.timeType !== "custom"}
            />

            <Button
              type="submit"
              isDisabled={!formik.isValid || !formik.dirty}
              isLoading={formik.isValidating}
              colorScheme="teal"
              mt={4}
              leftIcon={<AddIcon />}
            >
              Add
            </Button>
          </VStack>

          <Divider />

          <VStack gap={2}>
            <Heading size="md">Generated Dates ({timezone})</Heading>

            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Date Time</Th>
                    <Th>As Milis</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {dateData.map((data, index) => (
                    <Tr key={index}>
                      <Td>{data.dateTime.split("T").join(" ")}</Td>
                      <Td
                        color="cyan"
                        cursor={"pointer"}
                        onClick={() => {
                          navigator.clipboard.writeText(data.asMilis.toString());
                          toast({
                            title: "Copied",
                            status: "success",
                          });
                        }}
                      >
                        {data.asMilis}
                        <IconButton
                          marginLeft={4}
                          colorScheme="blue"
                          aria-label={`Copy ${data.asMilis}`}
                          icon={<CopyIcon />}
                          size={"xs"}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </VStack>
      </form>
    </Box>
  );
}
