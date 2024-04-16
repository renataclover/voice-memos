import { useMemos } from '@/hooks/useMemos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  memo: z.string().min(1, {
    message: 'Memo can not be empty',
  }),
});

export const MemoForm = ({ onDone }: { onDone: () => void }) => {
  const { save } = useMemos();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memo: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    save(values.memo);
    onDone();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col mr-24"
      >
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New memo</FormLabel>
              <FormControl>
                <Textarea placeholder="Start typing your memo..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end mt-2">
          <Button type="submit" className="mr-4">
            Submit
          </Button>
          <Button type="submit" variant="outline" onClick={onDone}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
