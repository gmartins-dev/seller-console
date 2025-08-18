import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingOverlay } from '@/components/ui/loading-state';
import { Target, DollarSign } from 'lucide-react';
import { useConvertLeadMutation } from '@/lib/queries';
import { useErrorHandler } from '@/lib/queries';
import type { Lead } from '@/types';

interface ConvertLeadDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const convertLeadSchema = z.object({
  name: z.string().min(1, 'Opportunity name is required'),
  stage: z.enum(['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost']),
  amount: z.number().optional(),
  accountName: z.string().min(1, 'Account name is required'),
});

type ConvertLeadFormData = z.infer<typeof convertLeadSchema>;

export function ConvertLeadDialog({ lead, open, onOpenChange, onSuccess }: ConvertLeadDialogProps) {
  const convertLeadMutation = useConvertLeadMutation();
  const { handleError } = useErrorHandler();

  const form = useForm<ConvertLeadFormData>({
    resolver: zodResolver(convertLeadSchema),
    defaultValues: {
      name: '',
      stage: 'prospecting',
      amount: undefined,
      accountName: '',
    },
  });

  // Reset form when lead changes or dialog opens
  useEffect(() => {
    if (lead && open) {
      form.reset({
        name: `${lead.company} - ${lead.name} Opportunity`,
        stage: 'prospecting',
        amount: undefined,
        accountName: lead.company,
      });
    }
  }, [lead, open, form]);

  const onSubmit = async (data: ConvertLeadFormData) => {
    if (!lead) return;

    try {
      await convertLeadMutation.mutateAsync({
        leadId: lead.id,
        opportunityData: data,
      });
      
      onSuccess();
      form.reset();
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const stageOptions: { value: ConvertLeadFormData['stage']; label: string; description: string }[] = [
    { value: 'prospecting', label: 'Prospecting', description: 'Initial contact and research' },
    { value: 'qualification', label: 'Qualification', description: 'Qualifying the opportunity' },
    { value: 'proposal', label: 'Proposal', description: 'Proposal submitted' },
    { value: 'negotiation', label: 'Negotiation', description: 'In negotiation phase' },
    { value: 'closed_won', label: 'Closed Won', description: 'Successfully closed' },
    { value: 'closed_lost', label: 'Closed Lost', description: 'Lost the opportunity' },
  ];

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <LoadingOverlay isLoading={convertLeadMutation.isPending}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Convert Lead to Opportunity
            </DialogTitle>
            <DialogDescription>
              Create a new opportunity from <strong>{lead.name}</strong> at{' '}
              <strong>{lead.company}</strong>.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opportunity Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter opportunity name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter account name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Stage</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select initial stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {stageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-muted-foreground">
                                  {option.description}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Amount (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pl-10"
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? undefined : Number(value));
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Target className="w-4 h-4 mr-2" />
                  Convert Lead
                </Button>
              </div>
            </form>
          </Form>
        </LoadingOverlay>
      </DialogContent>
    </Dialog>
  );
}
