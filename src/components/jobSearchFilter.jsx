import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const JobSearchFilter = ({ onFilterChange }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      query: 'coding',
      employment_types: [],
      date_posted: 'all',
      work_from_home: false,
      country: 'us',
      language: '',
      job_requirements: [],
    }
  });

  const onSubmit = (data) => {
    // Convert form data to API parameters
    const params = {
      ...data,
      employment_types: data.employment_types.join(','),
      job_requirements: data.job_requirements.join(','),
    };
    
    // Remove empty values
    Object.keys(params).forEach(key => 
      (params[key] === '' || params[key] === false || params[key] === undefined) && delete params[key]
    );
    
    onFilterChange(params);
  };

  const employmentTypes = [
    { value: 'FULLTIME', label: 'Full-time' },
    { value: 'CONTRACTOR', label: 'Contractor' },
    { value: 'PARTTIME', label: 'Part-time' },
    { value: 'INTERN', label: 'Intern' },
  ];

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'es', label: 'Spain' },
    { value: 'it', label: 'Italy' },
    { value: 'nl', label: 'Netherlands' },
    { value: 'jp', label: 'Japan' },
    { value: 'sg', label: 'Singapore' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
  ];

  const jobRequirements = [
    { value: 'under_3_years_experience', label: 'Under 3 years experience' },
    { value: 'more_than_3_years_experience', label: 'More than 3 years experience' },
    { value: 'no_experience', label: 'No experience' },
    { value: 'no_degree', label: 'No degree required' },
  ];

  const datePostedOptions = [
    { value: 'all', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: '3days', label: 'Past 3 days' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full bg-white dark:bg-gray-800 max-w-sm">
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <Controller
              name="query"
              control={control}
              render={({ field }) => (
                <Input 
                  placeholder="Job title, keywords, or location" 
                  {...field}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Employment Type</label>
            <div className="space-y-2">
              {employmentTypes.map((type) => (
                <Controller
                  key={type.value}
                  name="employment_types"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(type.value)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...field.value, type.value]
                            : field.value.filter((value) => value !== type.value);
                          field.onChange(updatedValue);
                        }}
                      />
                      <label className="text-sm">{type.label}</label>
                    </div>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Posted</label>
            <Controller
              name="date_posted"
              control={control}
              render={({ field }) => (
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    {datePostedOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Requirements</label>
            <div className="space-y-2">
              {jobRequirements.map((req) => (
                <Controller
                  key={req.value}
                  name="job_requirements"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(req.value)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...field.value, req.value]
                            : field.value.filter((value) => value !== req.value);
                          field.onChange(updatedValue);
                        }}
                      />
                      <label className="text-sm">{req.label}</label>
                    </div>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Controller
                name="work_from_home"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label className="text-sm font-medium">Remote Only</label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default JobSearchFilter;
